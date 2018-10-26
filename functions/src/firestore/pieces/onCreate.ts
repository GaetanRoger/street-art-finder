import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';
import {Helpers} from '../../helpers';
import {getFirestore} from '../../getFirestore';
import DocumentReference = FirebaseFirestore.DocumentReference;

export function firestorePiecesOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const piece = snap.data();
    const id = snap.id;

    return Promise.all([
        incrementMaxScoreOnUsersArtists(piece.artist.objectID, piece.tags.vanished),
        incrementPieceCountAndUpdateCitiesOnArtist(piece),
        addAlgoliaObject(id, piece),
        addPieceToUsersPiecesForAllUsersFollowingArtist(id, piece),
        incrementPiecesCountInAggregatesDocument()
    ]);
}

async function incrementMaxScoreOnUsersArtists(artistId: string, vanished: boolean) {
    if (vanished) {
        // No increment as a vanished piece is not part of the progression
        return null;
    }

    const usersArtistsQuery = getFirestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId);

    return getFirestore().runTransaction(async t => {
        const usersArtists = await t.get(usersArtistsQuery);

        usersArtists.forEach(ua => {
            t.update(ua.ref, {
                maxScore: ua.data().maxScore + 1
            });
        });
    });
}

async function incrementPieceCountAndUpdateCitiesOnArtist(piece) {
    const artistQuery: DocumentReference = await getFirestore()
        .doc(`${Collections.artists}/${piece.artist.objectID}`);

    return getFirestore().runTransaction(async t => {
        const artist = await t.get(artistQuery);

        const data = artist.data();
        const ref = artist.ref;

        const cities = data.cities || [];

        if (piece.address.city && !cities.includes(piece.address.city))
            cities.push(piece.address.city);

        t.update(ref, {
            piecesCount: data.piecesCount + 1,
            cities: cities
        });
    });
}

function addAlgoliaObject(objectID: string, piece): Promise<any> {
    const client = algolia.initIndex(Collections.pieces);

    return client.addObject(Helpers.pieceToAlgoliaObject(piece, objectID));
}

async function addPieceToUsersPiecesForAllUsersFollowingArtist(id: string, piece) {
    const firestore = admin.firestore();

    const usersArtists = await firestore
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', piece.artist.objectID)
        .get();

    return await usersArtists.forEach(userArtist => {
        const userArtistData = userArtist.data();

        return firestore.collection(Collections.users_pieces)
            .add(Helpers.pieceToUserPiece(piece, userArtistData.user, false, id));
    });
}

function incrementPiecesCountInAggregatesDocument() {
    const aggregates = getFirestore().doc(`${Collections.aggregates}/main`);

    return Helpers.increment(aggregates, 'piecesCount', 1);
}

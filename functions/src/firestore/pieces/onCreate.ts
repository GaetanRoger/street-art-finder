import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';
import {Helpers} from '../../helpers';

export function firestorePiecesOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const piece = snap.data();
    const id = snap.id;

    return Promise.all([
        incrementMaxScoreOnUsersArtists(piece.artist.objectID, piece.tags.vanished),
        incrementPieceCountAndUpdateCitiesOnArtist(piece),
        addAlgoliaObject(id, piece),
        addPieceToUsersPiecesForAllUsersFollowingArtist(id, piece),
        incrementPiecesCountInAggregatesDocument()
    ] as Promise<any>[]);
}

async function incrementMaxScoreOnUsersArtists(artistId: string, vanished: boolean) {
    if (vanished) {
        // No increment as a vanished piece is not part of the progression
        return null;
    }

    const batch = admin.firestore().batch();

    const usersArtists = await admin.firestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .get();

    usersArtists.forEach(ua => {
        batch.update(ua.ref, {
            maxScore: ua.data().maxScore + 1
        });
    });

    return await batch.commit();
}

async function incrementPieceCountAndUpdateCitiesOnArtist(piece) {
    const artist = await admin.firestore()
        .doc(`${Collections.artists}/${piece.artist.objectID}`)
        .get();

    const data = artist.data();
    const ref = artist.ref;

    const cities = data.cities || [];
    if (!cities.includes(piece.address.city))
        cities.push(piece.address.city);

    return await ref.update({
        piecesCount: data.piecesCount + 1,
        cities: cities
    });
}

function addAlgoliaObject(objectID: string, piece): Promise<any> {
    const client = algolia.initIndex(Collections.pieces);

    return client.addObject(Helpers.pieceToAlgoliaObject(piece, objectID));
}

async function addPieceToUsersPiecesForAllUsersFollowingArtist(id: string, piece){
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
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount + 1
            });
        });
}

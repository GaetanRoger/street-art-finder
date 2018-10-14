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
        incrementPieceCountOnArtist(piece),
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

function incrementPieceCountOnArtist(piece) {
    return admin.firestore()
        .doc(`${Collections.artists}/${piece.artist.objectID}`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount + 1
            });
        });
}

function addAlgoliaObject(objectID: string, piece) {
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
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount + 1
            });
        });
}

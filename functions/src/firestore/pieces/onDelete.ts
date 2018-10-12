import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';

export function firestorePiecesOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const piece = snap.data() ;
    const id = snap.id;

    return Promise.all([
        decrementMaxScoreOnUsersArtists(piece.artist.objectID, piece.tags.vanished),
        decrementPiecesCountOnArtistDocument(piece),
        deleteAlgoliaObject(id),
        deleteUsersPieces(id),
        decrementPiecesCountInAggregatesDocument()
    ]);
}

async function decrementMaxScoreOnUsersArtists(artistId: string, vanished: boolean) {
    if (vanished) {
        // Not need to decrement as vanished pieces do not count
        return null;
    }

    const batch = admin.firestore().batch();

    const usersArtists = await admin.firestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .get();

    usersArtists.forEach(ua => {
        batch.update(ua.ref, {
            maxScore: ua.data().maxScore - 1
        });
    });

    return await batch.commit();
}

function decrementPiecesCountOnArtistDocument(piece) {
    return admin.firestore()
        .doc(`${Collections.artists}/${piece.artist.objectID}`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount - 1
            });
        });
}

function deleteAlgoliaObject(id: string) {
    const client = algolia.initIndex(Collections.pieces);
    return client.deleteObject(id);
}

async function deleteUsersPieces(id: string) {
    const usersPieces = await admin.firestore()
        .collection(Collections.users_pieces)
        .where('piece.objectID', '==', id)
        .get();

    return usersPieces.forEach(userPiece => {
        return userPiece.ref.delete();
    });
}

function decrementPiecesCountInAggregatesDocument() {
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount - 1
            });
        });
}

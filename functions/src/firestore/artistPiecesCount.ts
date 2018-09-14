import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from './collections.enum';

export const incrementPiecesCountOnArtistFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onCreate((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.artists}/${snap.data().artist.objectID}`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    piecesCount: doc.data().piecesCount + 1
                });
            });
    });

export const decrementPiecesCountOnArtistFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onDelete((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.artists}/${snap.data().artist.objectID}`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    piecesCount: doc.data().piecesCount - 1
                });
            });
    });
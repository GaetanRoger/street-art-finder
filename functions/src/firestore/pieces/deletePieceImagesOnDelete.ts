import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export const deletePieceImagesOnDeleteFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onDelete((snap, context) => {
        const pieceId = snap.id;
        const artistId = snap.data().artist.objectID;
        const bucket = admin.storage().bucket();
        const directory = `/artists/${artistId}/pieces/${pieceId}`;

        console.log('Deleting the piece image directory:', directory);

        return bucket.deleteFiles({
            directory: directory
        });
    });
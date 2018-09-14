import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export const updateArtistNameOnPiecesFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onUpdate((change, context) => {
        const oldName = change.before.data().name;
        const newName = change.after.data().name;
        const artistId = context.params.artistId;

        if (oldName === newName)
            return null;

        const batch = admin.firestore().batch();

        return admin.firestore()
            .collection(Collections.pieces)
            .where('artist.objectID', '==', artistId)
            .get()
            .then(pieces => {
                pieces.forEach(ua => {
                    batch.update(ua.ref, {['artist.name']: newName});
                });

                return batch.commit();
            });
    });
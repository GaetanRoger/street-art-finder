import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export const updateScoreOnUserArtistWhenAPieceIsFoundFunction = functions.firestore
    .document(`${Collections.users_pieces}/{userPieceId}`)
    .onUpdate((change, context) => {
        const dataBefore = change.before.data();
        const dataAfter = change.after.data();

        const oldValue = dataBefore.found;
        const newValue = dataAfter.found;

        if (oldValue === newValue) {
            return null;
        }

        // If found, increment score by one ; else decrement by one.
        const increment = newValue ? 1 : -1;
        const artistId = dataAfter.artist.objectID;
        const userId = dataAfter.user;

        return admin.firestore()
            .collection(Collections.users_artists)
            .where('artist.objectID', '==', artistId)
            .where('user', '==', userId)
            .get()
            .then(ua => {
                if (ua.size !== 1) {
                    console.error(`MULTIPLE users_artists RETURNED FOR ARTIST ${artistId} AND USER ${userId}`);
                    return null;
                } else {
                    const doc = ua.docs[0];
                    return doc.ref.update({score: doc.data().score + increment});
                }
            });
    });
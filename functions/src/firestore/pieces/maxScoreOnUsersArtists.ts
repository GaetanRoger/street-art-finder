import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';


export const incrementMaxScoreOnUsersArtistsFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onCreate((snap, context) => {
        const artistId = snap.data().artist.objectID;
        const batch = admin.firestore().batch();

        return admin.firestore()
            .collection(Collections.users_artists)
            .where('artist.objectID', '==', artistId)
            .get()
            .then(usersArtists => {
                usersArtists.forEach(ua => {
                    batch.update(ua.ref, {
                        maxScore: ua.data().maxScore + 1
                    });
                });

                return batch.commit();
            });
    });

export const decrementMaxScoreOnUsersArtistsFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onDelete((snap, context) => {

        const artistId = snap.data().artist.objectID;
        const batch = admin.firestore().batch();

        return admin.firestore()
            .collection('users_artists')
            .where('artist.objectID', '==', artistId)
            .get()
            .then(usersArtists => {
                usersArtists.forEach(ua => {
                    batch.update(ua.ref, {
                        maxScore: ua.data().maxScore - 1
                    });
                });

                return batch.commit();
            });
    });
import * as functions from 'firebase-functions';
import {Collections} from './collections.enum';
import * as admin from 'firebase-admin';

export const updateArtistNameOnUsersArtistsFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onUpdate((change, context) => {
        const oldName = change.before.data().name;
        const newName = change.after.data().name;
        const artistId = context.params.artistId;

        if (oldName === newName)
            return null;

        const batch = admin.firestore().batch();

        return admin.firestore()
            .collection(Collections.users_artists)
            .where('artist.objectID', '==', artistId)
            .get()
            .then(users_artists => {
                users_artists.forEach(ua => {
                    batch.update(ua.ref, {['artist.name']: newName});
                });

                return batch.commit();
            });
    });
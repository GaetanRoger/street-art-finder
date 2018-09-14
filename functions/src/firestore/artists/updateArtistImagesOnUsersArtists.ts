import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export const updateArtistImagesOnUsersArtistsFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onUpdate((change, context) => {
        const oldImages = change.before.data().images;
        const newImages = change.after.data().images;
        const artistId = context.params.artistId;

        if (JSON.stringify(oldImages) === JSON.stringify(newImages))
            return null;

        const batch = admin.firestore().batch();

        return admin.firestore()
            .collection(Collections.users_artists)
            .where('artist.objectID', '==', artistId)
            .get()
            .then(users_artists => {
                users_artists.forEach(ua => {
                    batch.update(ua.ref, {['artist.images']: newImages});
                });

                return batch.commit();
            });
    });
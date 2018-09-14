"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const collections_enum_1 = require("../collections.enum");
const admin = require("firebase-admin");
exports.updateArtistImagesOnUsersArtistsFunction = functions.firestore
    .document(`${collections_enum_1.Collections.artists}/{artistId}`)
    .onUpdate((change, context) => {
    const oldImages = change.before.data().images;
    const newImages = change.after.data().images;
    const artistId = context.params.artistId;
    if (JSON.stringify(oldImages) === JSON.stringify(newImages))
        return null;
    const batch = admin.firestore().batch();
    return admin.firestore()
        .collection(collections_enum_1.Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .get()
        .then(users_artists => {
        users_artists.forEach(ua => {
            batch.update(ua.ref, { ['artist.images']: newImages });
        });
        return batch.commit();
    });
});
//# sourceMappingURL=updateArtistImagesOnUsersArtists.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const collections_enum_1 = require("../collections.enum");
const admin = require("firebase-admin");
exports.updateArtistNameOnUsersArtistsFunction = functions.firestore
    .document(`${collections_enum_1.Collections.artists}/{artistId}`)
    .onUpdate((change, context) => {
    const oldName = change.before.data().name;
    const newName = change.after.data().name;
    const artistId = context.params.artistId;
    if (oldName === newName)
        return null;
    const batch = admin.firestore().batch();
    return admin.firestore()
        .collection(collections_enum_1.Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .get()
        .then(users_artists => {
        users_artists.forEach(ua => {
            batch.update(ua.ref, { ['artist.name']: newName });
        });
        return batch.commit();
    });
});
//# sourceMappingURL=updateArtistNameOnUsersArtists.js.map
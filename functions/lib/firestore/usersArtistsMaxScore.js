"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const collections_enum_1 = require("./collections.enum");
exports.incrementMaxScoreOnUsersArtistsFunction = functions.firestore
    .document(`${collections_enum_1.Collections.pieces}/{pieceId}`)
    .onCreate((snap, context) => {
    const artistId = snap.data().artist.objectID;
    const batch = admin.firestore().batch();
    return admin.firestore()
        .collection(collections_enum_1.Collections.users_artists)
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
exports.decrementMaxScoreOnUsersArtistsFunction = functions.firestore
    .document(`${collections_enum_1.Collections.pieces}/{pieceId}`)
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
//# sourceMappingURL=usersArtistsMaxScore.js.map
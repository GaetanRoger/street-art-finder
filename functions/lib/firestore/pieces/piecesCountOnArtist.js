"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const collections_enum_1 = require("../collections.enum");
exports.incrementPiecesCountOnArtistFunction = functions.firestore
    .document(`${collections_enum_1.Collections.pieces}/{pieceId}`)
    .onCreate((snap, context) => {
    return admin.firestore()
        .doc(`${collections_enum_1.Collections.artists}/${snap.data().artist.objectID}`)
        .get()
        .then(doc => {
        return doc.ref.update({
            piecesCount: doc.data().piecesCount + 1
        });
    });
});
exports.decrementPiecesCountOnArtistFunction = functions.firestore
    .document(`${collections_enum_1.Collections.pieces}/{pieceId}`)
    .onDelete((snap, context) => {
    return admin.firestore()
        .doc(`${collections_enum_1.Collections.artists}/${snap.data().artist.objectID}`)
        .get()
        .then(doc => {
        return doc.ref.update({
            piecesCount: doc.data().piecesCount - 1
        });
    });
});
//# sourceMappingURL=piecesCountOnArtist.js.map
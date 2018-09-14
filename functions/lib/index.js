"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const piecesCountOnArtist_1 = require("./firestore/pieces/piecesCountOnArtist");
const maxScoreOnUsersArtists_1 = require("./firestore/pieces/maxScoreOnUsersArtists");
const updateArtistNameOnPieces_1 = require("./firestore/artists/updateArtistNameOnPieces");
const updateArtistNameOnUsersArtists_1 = require("./firestore/artists/updateArtistNameOnUsersArtists");
const updateArtistImagesOnUsersArtists_1 = require("./firestore/artists/updateArtistImagesOnUsersArtists");
admin.initializeApp();
exports.incrementPiecesCountOnArtist = piecesCountOnArtist_1.incrementPiecesCountOnArtistFunction;
exports.decrementPiecesCountOnArtist = piecesCountOnArtist_1.decrementPiecesCountOnArtistFunction;
exports.incrementMaxScoreOnUsersArtists = maxScoreOnUsersArtists_1.incrementMaxScoreOnUsersArtistsFunction;
exports.decrementMaxScoreOnUsersArtists = maxScoreOnUsersArtists_1.decrementMaxScoreOnUsersArtistsFunction;
exports.updateArtistNameOnPieces = updateArtistNameOnPieces_1.updateArtistNameOnPiecesFunction;
exports.updateArtistNameOnUsersArtists = updateArtistNameOnUsersArtists_1.updateArtistNameOnUsersArtistsFunction;
exports.updateArtistImagesOnUsersArtists = updateArtistImagesOnUsersArtists_1.updateArtistImagesOnUsersArtistsFunction;
//# sourceMappingURL=index.js.map
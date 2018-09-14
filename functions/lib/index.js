"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const artistPiecesCount_1 = require("./firestore/artistPiecesCount");
const usersArtistsMaxScore_1 = require("./firestore/usersArtistsMaxScore");
const piecesArtistName_1 = require("./firestore/piecesArtistName");
const usersArtistsArtistName_1 = require("./firestore/usersArtistsArtistName");
admin.initializeApp();
exports.incrementPiecesCountOnArtist = artistPiecesCount_1.incrementPiecesCountOnArtistFunction;
exports.decrementPiecesCountOnArtist = artistPiecesCount_1.decrementPiecesCountOnArtistFunction;
exports.incrementMaxScoreOnUsersArtists = usersArtistsMaxScore_1.incrementMaxScoreOnUsersArtistsFunction;
exports.decrementMaxScoreOnUsersArtists = usersArtistsMaxScore_1.decrementMaxScoreOnUsersArtistsFunction;
exports.updateArtistNameOnPieces = piecesArtistName_1.updateArtistNameOnPiecesFunction;
exports.updateArtistNameOnUsersArtists = usersArtistsArtistName_1.updateArtistNameOnUsersArtistsFunction;
//# sourceMappingURL=index.js.map
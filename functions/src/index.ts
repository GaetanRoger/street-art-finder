import * as admin from 'firebase-admin';
import {decrementPiecesCountOnArtistFunction, incrementPiecesCountOnArtistFunction} from './firestore/artistPiecesCount';
import {decrementMaxScoreOnUsersArtistsFunction, incrementMaxScoreOnUsersArtistsFunction} from './firestore/usersArtistsMaxScore';
import {updateArtistNameOnPiecesFunction} from './firestore/piecesArtistName';
import {updateArtistNameOnUsersArtistsFunction} from './firestore/usersArtistsArtistName';

admin.initializeApp();

export const incrementPiecesCountOnArtist = incrementPiecesCountOnArtistFunction;
export const decrementPiecesCountOnArtist = decrementPiecesCountOnArtistFunction;
export const incrementMaxScoreOnUsersArtists = incrementMaxScoreOnUsersArtistsFunction;
export const decrementMaxScoreOnUsersArtists = decrementMaxScoreOnUsersArtistsFunction;
export const updateArtistNameOnPieces = updateArtistNameOnPiecesFunction;
export const updateArtistNameOnUsersArtists = updateArtistNameOnUsersArtistsFunction;
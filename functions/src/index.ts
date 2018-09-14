import * as admin from 'firebase-admin';
import {decrementPiecesCountOnArtistFunction, incrementPiecesCountOnArtistFunction} from './firestore/pieces/piecesCountOnArtist';
import {decrementMaxScoreOnUsersArtistsFunction, incrementMaxScoreOnUsersArtistsFunction} from './firestore/pieces/maxScoreOnUsersArtists';
import {updateArtistNameOnPiecesFunction} from './firestore/artists/updateArtistNameOnPieces';
import {updateArtistNameOnUsersArtistsFunction} from './firestore/artists/updateArtistNameOnUsersArtists';
import {updateArtistImagesOnUsersArtistsFunction} from './firestore/artists/updateArtistImagesOnUsersArtists';

admin.initializeApp();

export const incrementPiecesCountOnArtist = incrementPiecesCountOnArtistFunction;
export const decrementPiecesCountOnArtist = decrementPiecesCountOnArtistFunction;
export const incrementMaxScoreOnUsersArtists = incrementMaxScoreOnUsersArtistsFunction;
export const decrementMaxScoreOnUsersArtists = decrementMaxScoreOnUsersArtistsFunction;
export const updateArtistNameOnPieces = updateArtistNameOnPiecesFunction;
export const updateArtistNameOnUsersArtists = updateArtistNameOnUsersArtistsFunction;
export const updateArtistImagesOnUsersArtists = updateArtistImagesOnUsersArtistsFunction;
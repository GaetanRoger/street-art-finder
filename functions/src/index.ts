import * as admin from 'firebase-admin';
import {decrementPiecesCountOnArtistFunction, incrementPiecesCountOnArtistFunction} from './firestore/pieces/piecesCountOnArtist';
import {decrementMaxScoreOnUsersArtistsFunction, incrementMaxScoreOnUsersArtistsFunction} from './firestore/pieces/maxScoreOnUsersArtists';
import {updateArtistNameOnPiecesFunction} from './firestore/artists/updateArtistNameOnPieces';
import {updateArtistNameOnUsersArtistsFunction} from './firestore/artists/updateArtistNameOnUsersArtists';
import {updateArtistImagesOnUsersArtistsFunction} from './firestore/artists/updateArtistImagesOnUsersArtists';
import {
    decrementArtistsCountOnAggregatesFunction,
    incrementArtistsCountOnAggregatesFunction
} from './firestore/artists/updateArtistsCountOnAggregates';
import {
    decrementPiecesCountOnAggregatesFunction,
    incrementPiecesCountOnAggregatesFunction
} from './firestore/pieces/updatePiecesCountOnAggregates';
import {
    decrementUsersCountOnAggregatesFunction,
    incrementUsersCountOnAggregatesFunction
} from './firestore/users/updateUsersCountOnAggregates';
import {deleteUserFromFirestoreOnDeletionFunction} from './auth/deleteUserFromFirestoreOnDeletion';

admin.initializeApp();

export const incrementPiecesCountOnArtist = incrementPiecesCountOnArtistFunction;
export const decrementPiecesCountOnArtist = decrementPiecesCountOnArtistFunction;
export const incrementMaxScoreOnUsersArtists = incrementMaxScoreOnUsersArtistsFunction;
export const decrementMaxScoreOnUsersArtists = decrementMaxScoreOnUsersArtistsFunction;
export const updateArtistNameOnPieces = updateArtistNameOnPiecesFunction;
export const updateArtistNameOnUsersArtists = updateArtistNameOnUsersArtistsFunction;
export const updateArtistImagesOnUsersArtists = updateArtistImagesOnUsersArtistsFunction;
export const incrementArtistsCountOnAggregates = incrementArtistsCountOnAggregatesFunction;
export const decrementArtistsCountOnAggregates = decrementArtistsCountOnAggregatesFunction;
export const incrementPiecesCountOnAggregates = incrementPiecesCountOnAggregatesFunction;
export const decrementPiecesCountOnAggregates = decrementPiecesCountOnAggregatesFunction;
export const incrementUsersCountOnAggregates = incrementUsersCountOnAggregatesFunction;
export const decrementUsersCountOnAggregates = decrementUsersCountOnAggregatesFunction;
export const deleteUserFromFirestoreOnDeletion = deleteUserFromFirestoreOnDeletionFunction;
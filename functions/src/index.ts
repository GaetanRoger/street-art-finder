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
import {updateScoreOnUserArtistWhenAPieceIsFoundFunction} from './firestore/users_pieces/updateScoreOnUserArtistWhenAPieceIsFound';
import {
    createAlgoliaIndexOnArtistCreateFunction, deleteAlgoliaIndexOnArtistDeleteFunction,
    updateAlgoliaIndexOnArtistUpdateFunction
} from './firestore/artists/updateAlgoliaIndexOnArtistWrite';
import {
    createAlgoliaIndexOnPieceCreateFunction, deleteAlgoliaIndexOnPieceDeleteFunction,
    updateAlgoliaIndexOnPieceUpdateFunction
} from './firestore/pieces/updateAlgoliaIndexOnPieceWrite';
import {deletePieceImagesOnDeleteFunction} from './firestore/pieces/deletePieceImagesOnDelete';

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
export const updateScoreOnUserArtistWhenAPieceIsFound = updateScoreOnUserArtistWhenAPieceIsFoundFunction;
export const createAlgoliaIndexOnArtistCreate = createAlgoliaIndexOnArtistCreateFunction;
export const updateAlgoliaIndexOnArtistUpdate = updateAlgoliaIndexOnArtistUpdateFunction;
export const deleteAlgoliaIndexOnArtistDelete = deleteAlgoliaIndexOnArtistDeleteFunction;
export const createAlgoliaIndexOnPieceCreate = createAlgoliaIndexOnPieceCreateFunction;
export const updateAlgoliaIndexOnPieceUpdate = updateAlgoliaIndexOnPieceUpdateFunction;
export const deleteAlgoliaIndexOnPieceDelete = deleteAlgoliaIndexOnPieceDeleteFunction;
export const deletePieceImagesOnDelete = deletePieceImagesOnDeleteFunction;

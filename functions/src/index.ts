import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {Collections} from './firestore/collections.enum';

import {authOnDelete} from './auth/onDelete';
import {firestoreArtistsOnCreate} from './firestore/artists/onCreate';
import {firestoreArtistsOnUpdate} from './firestore/artists/onUpdate';
import {firestoreArtistsOnDelete} from './firestore/artists/onDelete';
import {firestorePiecesOnCreate} from './firestore/pieces/onCreate';
import {firestorePiecesOnUpdate} from './firestore/pieces/onUpdate';
import {firestorePiecesOnDelete} from './firestore/pieces/onDelete';
import {firestoreUsersOnCreate} from './firestore/users/onCreate';
import {firestoreUsersOnDelete} from './firestore/users/onDelete';
import {firestoreUsersPiecesOnUpdate} from './firestore/users_pieces/onUpdate';
import {firestoreUsersArtistsOnCreate} from './firestore/users_artists/onCreate';


/* **************************************************************
 *   _____       _ _   _       _ _          _   _               *
 *  |_   _|     (_) | (_)     | (_)        | | (_)              *
 *    | |  _ __  _| |_ _  __ _| |_ ______ _| |_ _  ___  _ __    *
 *    | | | '_ \| | __| |/ _` | | |_  / _` | __| |/ _ \| '_ \   *
 *   _| |_| | | | | |_| | (_| | | |/ / (_| | |_| | (_) | | | |  *
 *  |_____|_| |_|_|\__|_|\__,_|_|_/___\__,_|\__|_|\___/|_| |_|  *
 *                                                              *
 ****************************************************************/

admin.initializeApp();
const auth = functions.auth;
const firestore = functions.firestore;


/* *****************************
 *                 _   _       *
 *      /\        | | | |      *
 *     /  \  _   _| |_| |__    *
 *    / /\ \| | | | __| '_ \   *
 *   / ____ \ |_| | |_| | | |  *
 *  /_/    \_\__,_|\__|_| |_|  *
 *                             *
 *******************************/

export const authOnDeleteF = auth.user().onDelete(authOnDelete);


/* **********************************************
 *   ______ _               _                   *
 *  |  ____(_)             | |                  *
 *  | |__   _ _ __ ___  ___| |_ ___  _ __ ___   *
 *  |  __| | | '__/ _ \/ __| __/ _ \| '__/ _ \  *
 *  | |    | | | |  __/\__ \ || (_) | | |  __/  *
 *  |_|    |_|_|  \___||___/\__\___/|_|  \___|  *
 *                                              *
 ************************************************/

/*
 *     _       _   _    _
 *    /_\  _ _| |_(_)__| |_ ___
 *   / _ \| '_|  _| (_-<  _(_-<
 *  /_/ \_\_|  \__|_/__/\__/__/
 *
 */

const artistsDocument = firestore.document(`${Collections.artists}/{artistId}`);

export const firestoreArtistsOnCreateF = artistsDocument.onCreate(firestoreArtistsOnCreate);
export const firestoreArtistsOnUpdateF = artistsDocument.onUpdate(firestoreArtistsOnUpdate);
export const firestoreArtistsOnDeleteF = artistsDocument.onDelete(firestoreArtistsOnDelete);


/*
 *   ___ _
 *  | _ (_)___ __ ___ ___
 *  |  _/ / -_) _/ -_|_-<
 *  |_| |_\___\__\___/__/
 *
 */

const piecesDocument = firestore.document(`${Collections.pieces}/{pieceId}`);

export const firestorePiecesOnCreateF = piecesDocument.onCreate(firestorePiecesOnCreate);
export const firestorePiecesOnUpdateF = piecesDocument.onUpdate(firestorePiecesOnUpdate);
export const firestorePiecesOnDeleteF = piecesDocument.onDelete(firestorePiecesOnDelete);


/*
 *   _   _
 *  | | | |___ ___ _ _ ___
 *  | |_| (_-</ -_) '_(_-<
 *   \___//__/\___|_| /__/
 *
 */

const usersDocument = firestore.document(`${Collections.users}/{userId}`);

export const firestoreUsersOnCreateF = usersDocument.onCreate(firestoreUsersOnCreate);
export const firestoreUsersOnDeleteF = usersDocument.onDelete(firestoreUsersOnDelete);


/*
 *   _   _                ___ _
 *  | | | |___ ___ _ _ __| _ (_)___ __ ___ ___
 *  | |_| (_-</ -_) '_(_-<  _/ / -_) _/ -_|_-<
 *   \___//__/\___|_| /__/_| |_\___\__\___/__/
 *
 */

const usersPiecesDocument = firestore.document(`${Collections.users_pieces}/{userPieceId}`);

export const firestoreUsersPiecesOnUpdateF = usersPiecesDocument.onUpdate(firestoreUsersPiecesOnUpdate);



// Users artists
const usersArtistsDocument = firestore.document(`${Collections.users_artists}/{userArtistId}`);

export const firestoreUsersArtistsOnCreateF = usersArtistsDocument.onCreate(firestoreUsersArtistsOnCreate);
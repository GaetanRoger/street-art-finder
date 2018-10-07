import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Helpers} from '../../helpers';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export async function firestoreUsersPiecesOnUpdate(change: Change<DocumentSnapshot>, context: EventContext) {
    const userPieceBefore = change.before.data();
    const userPieceAfter = change.after.data();
    const id = change.after.id;

    if (Helpers.areObjectsTheSame(userPieceBefore, userPieceAfter))
        return null;

    return Promise.all([
        updateScoreOnUserArtistWhenAPieceIsFound(userPieceBefore, userPieceAfter)
    ]);
}

function updateScoreOnUserArtistWhenAPieceIsFound(userPieceBefore, userPieceAfter) {
    const oldFound = userPieceBefore.found;
    const newFound = userPieceAfter.found;

    if (oldFound === newFound) {
        return null;
    }

    // If found, increment score by one ; else decrement by one.
    const increment = newFound ? 1 : -1;
    const artistId = userPieceAfter.artist.objectID;
    const userId = userPieceAfter.user;

    return admin.firestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .where('user', '==', userId)
        .get()
        .then(ua => {
            if (ua.size !== 1) {
                const errorText = `MULTIPLE users_artists RETURNED FOR ARTIST ${artistId} AND USER ${userId}`;
                console.error(errorText);
                return Promise.reject(errorText);
            } else {
                const doc = ua.docs[0];
                return doc.ref.update({score: doc.data().score + increment});
            }
        });
}
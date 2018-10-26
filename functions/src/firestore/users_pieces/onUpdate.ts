import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Helpers} from '../../helpers';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';
import Firestore = FirebaseFirestore.Firestore;

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

async function updateScoreOnUserArtistWhenAPieceIsFound(userPieceBefore, userPieceAfter) {
    const oldFound = userPieceBefore.found;
    const newFound = userPieceAfter.found;

    if (oldFound === newFound) {
        return null;
    }

    const firestore = admin.firestore() as Firestore;


    // If found, increment score by one ; else decrement by one.
    const increment = newFound ? 1 : -1;
    const artistId = userPieceAfter.artist.objectID;
    const userId = userPieceAfter.user;

    const artistsQuery = await firestore
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId)
        .where('user', '==', userId);

    return await firestore.runTransaction(async (t) => {
        const artists = await t.get(artistsQuery);

        if (artists.size !== 1) {
            const errorText = `MULTIPLE users_artists RETURNED FOR ARTIST ${artistId} AND USER ${userId}`;
            console.error(errorText);
            return Promise.reject(errorText);
        }

        const artist = artists.docs[0];

        return await t.update(artist.ref, {score: artist.data().score + increment});
    });
}
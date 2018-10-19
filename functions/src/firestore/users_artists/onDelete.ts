import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';
import {algolia} from '../../initAlgolia';

export function firestoreUsersArtistsOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const userArtist = snap.data();
    const id = snap.id;

    return Promise.all([
        deleteUsersPiecesFromArtist(userArtist.user),
        deleteAlgoliaObject(id)
    ]);
}

async function deleteUsersPiecesFromArtist(user: string) {
    const firestore = admin.firestore();
    const batch = firestore.batch();

    const usersPieces = await firestore.collection(Collections.users_pieces)
        .where('user', '==', user)
        .get();

    await usersPieces.forEach(userPiece => batch.delete(userPiece.ref));

    return await batch.commit();
}

function deleteAlgoliaObject(id: string) {
    const client = algolia.initIndex(Collections.users_artists);
    return client.deleteObject(id);
}

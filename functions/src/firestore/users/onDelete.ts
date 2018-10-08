import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export function firestoreUsersOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const id = snap.id;


    return Promise.all([
        decrementUsersCountInAggregatesDocument(),
        deleteUsersArtistsOfUser(id)
    ]);
}

function decrementUsersCountInAggregatesDocument() {
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                usersCount: doc.data().usersCount - 1
            });
        });
}

async function deleteUsersArtistsOfUser(id: string) {
    const docs = await admin.firestore().collection(Collections.users_artists)
        .where('user', '==', id)
        .get();

    const batch = admin.firestore().batch();

    docs.forEach(doc => batch.delete(doc.ref));

    return await batch.commit();
}

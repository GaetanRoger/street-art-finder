import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export function firestoreUsersOnDelete(snap: DocumentSnapshot, context: EventContext) {
    return Promise.all([
        decrementUsersCountInAggregatesDocument()
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

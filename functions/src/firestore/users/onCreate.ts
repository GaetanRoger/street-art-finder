import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Collections} from '../collections.enum';
import {Helpers} from '../../helpers';
import {getFirestore} from '../../getFirestore';

export function firestoreUsersOnCreate(snap: DocumentSnapshot, context: EventContext) {
    return Promise.all([
        incrementUsersCountInAggregatesDocument()
    ]);
}

function incrementUsersCountInAggregatesDocument() {
    const aggregates = getFirestore().doc(`${Collections.aggregates}/main`);
    return Helpers.increment(aggregates, 'usersCount', 1);
}

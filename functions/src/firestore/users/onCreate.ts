import {EventContext} from 'firebase-functions';
import {Collections} from '../collections.enum';
import {Helpers} from '../../helpers';
import {getFirestore} from '../../getFirestore';
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;

export function firestoreUsersOnCreate(snap: DocumentSnapshot, context: EventContext) {
    return Promise.all([
        incrementUsersCountInAggregatesDocument(),
        createWelcomingNotification(snap)
    ]);
}

function incrementUsersCountInAggregatesDocument() {
    const aggregates = getFirestore().doc(`${Collections.aggregates}/main`);
    return Helpers.increment(aggregates, 'usersCount', 1);
}

function createWelcomingNotification(snap: DocumentSnapshot) {
    const notification = {
        title: 'Welcome to Streart!',
        text: 'We hope you will enjoy your journey! Check out the artists in your city and have fun exploring! (swipe this when done reading)',
        read: false,
        icon: 'insert_emoticon',
        date: Date.now(),
        user: snap.id
    };

    return getFirestore()
        .collection(Collections.notifications)
        .add(notification);
}

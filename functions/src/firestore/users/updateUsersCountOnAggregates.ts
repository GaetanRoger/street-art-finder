import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export const incrementUsersCountOnAggregatesFunction = functions.firestore
    .document(`${Collections.users}/{userId}`)
    .onCreate((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.aggregates}/main`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    usersCount: doc.data().usersCount + 1
                });
            });
    });

export const decrementUsersCountOnAggregatesFunction = functions.firestore
    .document(`${Collections.users}/{userId}`)
    .onDelete((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.aggregates}/main`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    usersCount: doc.data().usersCount - 1
                });
            });
    });
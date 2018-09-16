import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export const incrementArtistsCountOnAggregatesFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onCreate((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.aggregates}/main`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    artistsCount: doc.data().artistsCount + 1
                });
            });
    });

export const decrementArtistsCountOnAggregatesFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onDelete((snap, context) => {
        return admin.firestore()
            .doc(`${Collections.aggregates}/main`)
            .get()
            .then(doc => {
                return doc.ref.update({
                    artistsCount: doc.data().artistsCount - 1
                });
            });
    });
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import {Task} from 'algoliasearch';
import * as admin from 'firebase-admin';

export function firestoreArtistsOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const id = snap.id;

    return Promise.all([
        deleteAlgoliaObject(id),
        decrementArtistCountFieldInAggregatesDocument()
    ]);
}

function deleteAlgoliaObject(id: string): Promise<Task> {
    const client = algolia.initIndex(Collections.artists);
    return client.deleteObject(id);
}

function decrementArtistCountFieldInAggregatesDocument() {
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                artistsCount: doc.data().artistsCount - 1
            });
        });
}

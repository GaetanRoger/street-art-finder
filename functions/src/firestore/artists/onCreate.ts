import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';
import {Task} from 'algoliasearch';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export function firestoreArtistsOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const artist = snap.data();
    const id = snap.id;

    return Promise.all([
        incrementArtistsCountInAggregatesDocument(),
        createAlgoliaObject(id, artist)
    ]);
}

/**
 * Increment the value of `artistsCount` in the `aggregates` document.
 */
async function incrementArtistsCountInAggregatesDocument() {
    const aggregates = await admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get();

    const aggregatesData = aggregates.data();
    const aggregatesRef = aggregates.ref;

    return aggregatesRef.update({
        artistsCount: aggregatesData.artistsCount + 1
    });
}

/**
 * Create an entry in the `artists` Algolia index.
 */
function createAlgoliaObject(objectID: string, artist): Promise<Task> {
    const client = algolia.initIndex(Collections.artists);

    return client.addObject({
        objectID,
        ...artist
    });
}

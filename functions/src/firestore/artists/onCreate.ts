import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import {Task} from 'algoliasearch';
import {EventContext} from 'firebase-functions';
import {getFirestore} from '../../getFirestore';
import {Helpers} from '../../helpers';
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import DocumentReference = FirebaseFirestore.DocumentReference;

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
    const aggregatesQuery: DocumentReference = await getFirestore()
        .doc(`${Collections.aggregates}/main`);

    return Helpers.increment(aggregatesQuery, 'artistsCount', 1);
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

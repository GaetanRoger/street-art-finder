import {EventContext} from 'firebase-functions';
import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import {Task} from 'algoliasearch';
import {getFirestore} from '../../getFirestore';
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import DocumentReference = FirebaseFirestore.DocumentReference;
import {Helpers} from '../../helpers';

export function firestoreArtistsOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const id = snap.id;

    return Promise.all([
        decrementArtistCountFieldInAggregatesDocument(),
        deleteAlgoliaObject(id)
    ]);
}

function deleteAlgoliaObject(id: string): Promise<Task> {
    const client = algolia.initIndex(Collections.artists);
    return client.deleteObject(id);
}

async function decrementArtistCountFieldInAggregatesDocument() {
    const aggregatesQuery: DocumentReference = await getFirestore()
        .doc(`${Collections.aggregates}/main`);

    return Helpers.increment(aggregatesQuery, 'artistsCount', -1);
}

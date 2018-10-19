import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import {Helpers} from '../../helpers';
import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';

export async function firestoreUsersArtistsOnUpdate(change: Change<DocumentSnapshot>, context: EventContext) {
    const userArtistBefore = change.before.data();
    const userArtistAfter = change.after.data();
    const id = change.after.id;

    if (Helpers.areObjectsTheSame(userArtistBefore, userArtistAfter))
        return null;

    return Promise.all([
        updateAlgoliaObject(id, userArtistAfter),
    ]);
}

function updateAlgoliaObject(objectID: string, userArtist) {
    const client = algolia.initIndex(Collections.users_artists);
    return client.addObject(Helpers.userArtistToAlgoliaObject(userArtist, objectID));
}
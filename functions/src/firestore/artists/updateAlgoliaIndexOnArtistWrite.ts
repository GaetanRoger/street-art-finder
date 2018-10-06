import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as algoliasearch from 'algoliasearch';

const env = functions.config();
const algolia = algoliasearch(env.algolia.appid, env.algolia.apikey);
const client = algolia.initIndex(Collections.artists);

export const createAlgoliaIndexOnArtistCreateFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onCreate((snap, context) => {
        const artist = snap.data();
        const objectId = snap.id;

        return client.addObject({
            objectId,
            ...artist
        });
    });

export const updateAlgoliaIndexOnArtistUpdateFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onUpdate((snap, context) => {
        const artistAfter = snap.after.data();
        const artistBefore = snap.before.data();
        const objectId = snap.after.id;

        if (JSON.stringify(artistBefore) === JSON.stringify(artistBefore))
            return null;

        return client.addObject({
            objectId,
            ...artistAfter
        });
    });

export const deleteAlgoliaIndexOnArtistDeleteFunction = functions.firestore
    .document(`${Collections.artists}/{artistId}`)
    .onDelete((snap, context) => {
        const objectId = snap.id;

        return client.deleteObject(objectId);
    });
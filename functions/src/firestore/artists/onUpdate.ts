import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Change, EventContext} from 'firebase-functions';
import {Helpers} from '../../helpers';
import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export function firestoreArtistsOnUpdate(change: Change<DocumentSnapshot>, context: EventContext) {
    const artistBefore = change.before.data();
    const artistAfter = change.after.data();
    const id = change.after.id;

    if (Helpers.areObjectsTheSame(artistBefore, artistAfter))
        return null;

    return Promise.all([
        updateAlgoliaObject(id, artistAfter),
        updateArtistPreviewOnUsersArtistsEntries(id, artistBefore, artistAfter),
        updateArtistNameOnPiecesEntries(id, artistBefore, artistAfter)
    ]);
}

/**
 * Update Algolia `artists` entry.
 * @param objectID Artist ID.
 * @param artistAfter Artist data.
 */
function updateAlgoliaObject(objectID: string, artistAfter) {
    const client = algolia.initIndex(Collections.artists);

    return client.addObject({
        objectID,
        ...artistAfter
    });
}

/**
 * Update `images` field on every `users_artists` entry (which match current artist).
 */
async function updateArtistPreviewOnUsersArtistsEntries(id: string, artistBefore, artistAfter) {
    const artistBeforePreview = Helpers.artistToArtistPreview(artistBefore, id);
    const artistAfterPreview = Helpers.artistToArtistPreview(artistAfter, id);

    if (Helpers.areObjectsTheSame(artistBeforePreview, artistAfterPreview))
        return null;

    const usersArtists = await admin.firestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', id)
        .get();

    const batch = admin.firestore().batch();

    usersArtists.forEach(ua => {
        batch.update(ua.ref, {
            artist: artistAfterPreview
        });
    });

    return await batch.commit();
}

async function updateArtistNameOnPiecesEntries(id: string, artistBefore, artistAfter) {
    if (artistBefore.name === artistAfter.name)
        return null;

    const pieces = await admin.firestore()
        .collection(Collections.pieces)
        .where('artist.objectID', '==', id)
        .get();

    const batch = admin.firestore().batch();

    pieces.forEach(ua => {
        batch.update(ua.ref, {['artist.name']: artistAfter.name});
    });

    return await batch.commit();
}

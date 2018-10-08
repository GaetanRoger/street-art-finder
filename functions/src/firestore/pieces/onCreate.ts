import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';
import {pieceToAlgoliaObject} from './pieceToAlgoliaObject';

export function firestorePiecesOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const piece = snap.data();
    const id = snap.id;

    return Promise.all([
        incrementMaxScoreOnUsersArtists(id),
        incrementPieceCountOnArtist(piece),
        addAlgoliaObject(id, piece),
        addPieceToUsersPiecesForAllUsersFollowingArtist(id, piece),
        incrementPiecesCountInAggregatesDocument()
    ]);
}

async function incrementMaxScoreOnUsersArtists(id: string) {
    const batch = admin.firestore().batch();

    const usersArtists = await admin.firestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', id)
        .get();

    usersArtists.forEach(ua => {
        batch.update(ua.ref, {
            maxScore: ua.data().maxScore + 1
        });
    });

    return await batch.commit();
}

function incrementPieceCountOnArtist(piece) {
    return admin.firestore()
        .doc(`${Collections.artists}/${piece.artist.objectID}`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount + 1
            });
        });
}

function addAlgoliaObject(objectID: string, piece) {
    const client = algolia.initIndex(Collections.pieces);

    return client.addObject(pieceToAlgoliaObject(objectID, piece));
}

async function addPieceToUsersPiecesForAllUsersFollowingArtist(id: string, piece) {
    const firestore = admin.firestore();

    const usersArtists = await firestore
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', piece.artist.objectID)
        .get();

    return await usersArtists.forEach(userArtist => {
        const userArtistData = userArtist.data();

        return firestore.collection(Collections.users_pieces)
            .add({
                user: userArtistData.user,
                artist: userArtistData.artist,
                piece: {
                    objectID: id,
                    name: piece.name,
                    images: piece.images
                },
                found: false
            });
    });
}

function incrementPiecesCountInAggregatesDocument() {
    return admin.firestore()
        .doc(`${Collections.aggregates}/main`)
        .get()
        .then(doc => {
            return doc.ref.update({
                piecesCount: doc.data().piecesCount + 1
            });
        });
}

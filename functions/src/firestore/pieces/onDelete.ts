import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';
import {getFirestore} from '../../getFirestore';
import {Helpers} from '../../helpers';

export function firestorePiecesOnDelete(snap: DocumentSnapshot, context: EventContext) {
    const piece = snap.data() ;
    const id = snap.id;

    return Promise.all([
        decrementMaxScoreOnUsersArtists(piece.artist.objectID, piece.tags.vanished),
        decrementPiecesCountOnArtistDocument(piece),
        deleteAlgoliaObject(id),
        deleteUsersPieces(id),
        decrementPiecesCountInAggregatesDocument()
    ]);
}

async function decrementMaxScoreOnUsersArtists(artistId: string, vanished: boolean) {
    if (vanished) {
        // Not need to decrement as vanished pieces do not count
        return null;
    }

    const usersArtistsQuery = getFirestore()
        .collection(Collections.users_artists)
        .where('artist.objectID', '==', artistId);

    return getFirestore().runTransaction(async t => {
        const usersArtists = await t.get(usersArtistsQuery);

        usersArtists.forEach(ua => {
            t.update(ua.ref, {
                maxScore: ua.data().maxScore - 1
            });
        });
    });
}

function decrementPiecesCountOnArtistDocument(piece) {
    const artist = getFirestore().doc(`${Collections.artists}/${piece.artist.objectID}`);

    return Helpers.increment(artist, 'piecesCount',-1);
}

function deleteAlgoliaObject(id: string) {
    const client = algolia.initIndex(Collections.pieces);
    return client.deleteObject(id);
}

async function deleteUsersPieces(id: string) {
    const usersPieces = await admin.firestore()
        .collection(Collections.users_pieces)
        .where('piece.objectID', '==', id)
        .get();

    return usersPieces.forEach(userPiece => {
        return userPiece.ref.delete();
    });
}

function decrementPiecesCountInAggregatesDocument() {
    const aggregates = getFirestore().doc(`${Collections.aggregates}/main`);

    return Helpers.increment(aggregates, 'piecesCount',-1);
}

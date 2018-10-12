import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Helpers} from '../../helpers';
import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';
import {pieceToAlgoliaObject} from './helpers/pieceToAlgoliaObject';
import {pieceToPiecePreview} from './helpers/pieceToPiecePreview';
import {userArtistAndPieceToUserPiece} from './helpers/userArtistAndPieceToUserPiece';

export async function firestorePiecesOnUpdate(change: Change<DocumentSnapshot>, context: EventContext) {
    const pieceBefore = change.before.data();
    const pieceAfter = change.after.data();
    const id = change.after.id;

    if (Helpers.areObjectsTheSame(pieceBefore, pieceAfter))
        return null;

    return Promise.all([
        updateAlgoliaObject(id, pieceAfter),
        updatePieceToUsersPiecesForAllUsersFollowingArtist(id, pieceBefore, pieceAfter),
        removeOrAddVanishedPiecesToUsersPieces(id, pieceBefore, pieceAfter)
    ]);
}

function updateAlgoliaObject(objectID: string, piece) {
    const client = algolia.initIndex(Collections.pieces);
    return client.addObject(pieceToAlgoliaObject(objectID, piece));
}

async function updatePieceToUsersPiecesForAllUsersFollowingArtist(id: string, pieceBefore, pieceAfter) {
    const piecePreviewBefore = pieceToPiecePreview(pieceBefore);
    const piecePreviewAfter = pieceToPiecePreview(pieceAfter);

    if (Helpers.areObjectsTheSame(piecePreviewBefore, piecePreviewAfter))
        return null;

    const usersPieces = await admin.firestore()
        .collection(Collections.users_pieces)
        .where('piece.objectID', '==', id)
        .get();

    return await usersPieces.forEach(userPiece => {
        return userPiece.ref.update({
            piece: piecePreviewAfter
        });
    });
}

async function removeOrAddVanishedPiecesToUsersPieces(pieceId: string, pieceBefore, pieceAfter) {
    if (pieceBefore.tags.vanished === pieceAfter.tags.vanished) {
        return null;
    }

    const firestore = admin.firestore();

    // If piece is now vanished
    if (pieceAfter.tags.vanished) {
        const usersPieces = await firestore
            .collection(Collections.users_pieces)
            .where('piece.objectID', '==', pieceId)
            .get();

        const batch = firestore.batch();
        usersPieces.forEach(p => batch.delete(p.ref));
        return await batch.commit();
    }
    // If piece is now unvanished
    else {
        const usersArtists = await firestore
            .collection(Collections.users_artists)
            .where('artist.objectID', '==', pieceAfter.artist.objectID)
            .get();

        const batch = firestore.batch();
        usersArtists.forEach(ua => {
            const uaData = ua.data();
            const newDoc = firestore.collection(Collections.users_pieces).doc();
            batch.create(newDoc, userArtistAndPieceToUserPiece(uaData, pieceAfter, false, pieceId));
        });

        return await batch.commit();
    }
}

import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Helpers} from '../../helpers';
import {algolia} from '../../initAlgolia';
import {Collections} from '../collections.enum';
import * as admin from 'firebase-admin';

export async function firestorePiecesOnUpdate(change: Change<DocumentSnapshot>, context: EventContext) {
    const pieceBefore = change.before.data();
    const pieceAfter = change.after.data();
    const id = change.after.id;

    if (Helpers.areObjectsTheSame(pieceBefore, pieceAfter))
        return null;

    return Promise.all([
        addAlgoliaObject(id, pieceAfter),
        updatePieceToUsersPiecesForAllUsersFollowingArtist(id, pieceBefore, pieceAfter)
    ]);
}

function addAlgoliaObject(objectID: string, piece) {
    const client = algolia.initIndex(Collections.pieces);
    return client.addObject({
        objectID,
        _geoloc: {
            lat: piece.location.latitude,
            lng: piece.location.longitude
        },
        ...piece
    });
}

async function updatePieceToUsersPiecesForAllUsersFollowingArtist(id: string, pieceBefore, pieceAfter) {
    const piecePreviewBefore = {
        objectID: pieceBefore.objectID,
        name: pieceBefore.name,
        images: pieceBefore.images
    };

    const piecePreviewAfter = {
        objectID: pieceAfter.objectID,
        name: pieceAfter.name,
        images: pieceAfter.images
    };

    if( Helpers.areObjectsTheSame(piecePreviewBefore, piecePreviewAfter))
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

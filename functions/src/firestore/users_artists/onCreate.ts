import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';

export function firestoreUsersArtistsOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const userArtist = snap.data();
    const id = snap.id;

    return Promise.all([
        createUsersPiecesFromArtist(userArtist.artist.objectID, userArtist.user)
    ]);
}

async function createUsersPiecesFromArtist(artistId: string, userId: string) {
    const firestore = admin.firestore();

    const pieces = await firestore.collection(Collections.pieces)
        .where('artist.objectID', '==', artistId)
        .get();

    return await pieces.forEach(piece => {
        const pieceData = piece.data();
        const userPiece = {
            piece: {
                objectID: pieceData.objectID,
                name: pieceData.name,
                images: pieceData.images
            },
            artist: pieceData.artist,
            user: userId,
            found: false
        };
        return firestore.collection(Collections.users_pieces)
            .add(userPiece);
    });
}

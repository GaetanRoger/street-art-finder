import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Collections} from '../collections.enum';
import {Helpers} from '../../helpers';
import {algolia} from '../../initAlgolia';
import {getFirestore} from '../../getFirestore';

export function firestoreUsersArtistsOnCreate(snap: DocumentSnapshot, context: EventContext) {
    const userArtist = snap.data();
    const id = snap.id;

    return Promise.all([
        createUsersPiecesFromArtist(userArtist.artist.objectID, userArtist.user),
        addAlgoliaObject(userArtist, id),
        incrementArtistFollowersCount(userArtist.artist.objectID)
    ]);
}

async function createUsersPiecesFromArtist(artistId: string, userId: string) {
    const firestore = admin.firestore();

    const pieces = await firestore.collection(Collections.pieces)
        .where('artist.objectID', '==', artistId)
        .get();

    return await pieces.forEach(piece => {
        const pieceData = piece.data();

        if (pieceData.tags.vanished) {
            return null;
        }

        const pieceId = piece.id;
        const userPiece = Helpers.pieceToUserPiece(pieceData, userId, false, pieceId);
        return firestore.collection(Collections.users_pieces).add(userPiece);
    });
}

function incrementArtistFollowersCount(artistId: string) {
    const artistRef = getFirestore()
        .collection(Collections.artists)
        .doc(artistId);

    return Helpers.increment(artistRef, 'followers', 1);
}

function addAlgoliaObject(userArtist, id: string) {
    const client = algolia.initIndex(Collections.users_artists);

    return client.addObject(Helpers.userArtistToAlgoliaObject(userArtist, id))
        .catch(err => console.error("Error while adding user artist to algolia", err));
}

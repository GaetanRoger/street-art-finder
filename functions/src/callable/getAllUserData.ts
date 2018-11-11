import * as functions from 'firebase-functions';
import {getFirestore} from '../getFirestore';
import {Collections} from '../firestore/collections.enum';
import Firestore = FirebaseFirestore.Firestore;
import {CallableContext} from 'firebase-functions/lib/providers/https';

function queryUser(firestore: Firestore, uid: string) {
    return firestore
        .collection(Collections.users)
        .doc(uid)
        .get();
}

function queryUserPieces(firestore: Firestore, uid: string) {
    return firestore
        .collection(Collections.users_pieces)
        .where('user', '==', uid)
        .get();
}

function queryUserArtists(firestore: Firestore, uid: string) {
    return firestore
        .collection(Collections.users_artists)
        .where('user', '==', uid)
        .get();
}

export const getAllUserData = async (data: any, context: CallableContext) => {
    const uid = context.auth.uid;

    if (!uid) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'The function must be called while authenticated.');
    }

    const firestore = getFirestore();

    const user = await queryUser(firestore, uid);
    const userArtists = await queryUserArtists(firestore, uid);
    const userPieces = await queryUserPieces(firestore, uid);

    const userData = user.data();
    const userPiecesData = userPieces.docs.map(d => d.data());
    const userArtistsData = userArtists.docs.map(d => d.data());

    return {
        id: uid,
        user: userData,
        userArtists: userArtistsData,
        userPieces: userPiecesData
    };
};
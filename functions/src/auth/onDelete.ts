import * as admin from 'firebase-admin';
import {Collections} from '../firestore/collections.enum';

export async function authOnDelete(user) {
    const firestore = admin.firestore();
    const batch = firestore.batch();

    const userRef = firestore.doc(`${Collections.users}/${user.uid}`);
    const docs = await firestore.collection(Collections.users_artists)
        .where('user', '==', user.uid)
        .get();

    docs.forEach(doc => batch.delete(doc.ref));
    batch.delete(userRef);

    return await batch.commit();
}

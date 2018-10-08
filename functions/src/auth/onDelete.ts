import * as admin from 'firebase-admin';
import {Collections} from '../firestore/collections.enum';

export async function authOnDelete(user) {
    return deleteUserDocumentFromFirestore(user);
}

function deleteUserDocumentFromFirestore(user) {
    return admin.firestore()
        .doc(`${Collections.users}/${user.uid}`)
        .delete();
}

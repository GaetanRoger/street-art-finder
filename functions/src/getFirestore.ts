import * as admin from 'firebase-admin';
import Firestore = FirebaseFirestore.Firestore;

export const getFirestore = (): Firestore => {
    return admin.firestore();
};
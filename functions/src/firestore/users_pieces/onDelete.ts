import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {getFirestore} from '../../getFirestore';
import {Collections} from '../collections.enum';

export function firestoreUsersPiecesOnDelete(snap: DocumentSnapshot, context: EventContext) {
  const userPiece = snap.data();
  const id = snap.id;

  return Promise.all([
    decrementMaxScoreOnUserArtist(userPiece)
  ]);
}

async function decrementMaxScoreOnUserArtist(userPiece) {
  const query = getFirestore().collection(Collections.users_artists)
    .where('user', '==', userPiece.user)
    .where('artist.objectID', '==', userPiece.artist.objectID);

  return getFirestore().runTransaction(async t => {
    const results = await t.get(query);
    const userArtistDoc = results.docs[0];

    const userArtist = userArtistDoc.data();
    const userArtistRef = userArtistDoc.ref;


    return t.update(userArtistRef, {
      maxScore: userArtist.maxScore - 1
    });
  });
}

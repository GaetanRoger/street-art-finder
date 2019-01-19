import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Collections} from '../collections.enum';
import {algolia} from '../../initAlgolia';
import {getFirestore} from '../../getFirestore';
import {Helpers} from '../../helpers';

export function firestorePiecesOnDelete(snap: DocumentSnapshot, context: EventContext) {
  const piece = snap.data();
  const id = snap.id;

  return Promise.all([
    decrementMaxScoreOnUsersArtists(piece.artist.objectID, piece.tags.vanished),
    decrementPiecesCountAndDecrementCityCountOnArtistDocument(piece),
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

function decrementPiecesCountAndDecrementCityCountOnArtistDocument(piece) {
  const artist = getFirestore().doc(`${Collections.published_artists}/${piece.artist.objectID}`);

  return getFirestore().runTransaction(async t => {
    const document = await t.get(artist);

    const ref = document.ref;
    const data = document.data();

    const city = piece.address.city || 'Other';
    const cities = data.cities || {};
    const cityCount = cities[city] || 1;
    const decrementedCityCount = cityCount - 1;

    return t.update(ref, {
      piecesCount: data.piecesCount - 1,
      cities: {
        ...cities,
        [city]: decrementedCityCount
      }
    });
  });
}

function deleteAlgoliaObject(id: string) {
  const client = algolia.initIndex(Collections.pieces);
  return client.deleteObject(id);
}

async function deleteUsersPieces(id: string) {
  const usersPieces = await getFirestore()
    .collection(Collections.users_pieces)
    .where('piece.objectID', '==', id)
    .get();

  return await Promise.all(usersPieces.docs.map(async userPiece => {
    const data = userPiece.data();
    const found = data.found;

    if (found) {
      await getFirestore().runTransaction(async t => {
        const query = getFirestore()
          .collection(Collections.users_artists)
          .where('user', '==', data.user)
          .where('artist.objectID', '==', data.artist.objectID);

        const userArtists = await t.get(query);

        if (userArtists.size !== 1) {
          console.warn(`FOUND MORE THAN 1 USER ARTIST FOR USER ${data.user} AND ARTIST`, data.artist);
          return await Promise.reject(`FOUND MORE THAN 1 USER ARTIST FOR USER ${data.user} AND ARTIST ${data.artist.objectID}`);
        }

        return await t.update(userArtists.docs[0].ref, {
          score: userArtists.docs[0].data().score - 1
        });
      });
    }

    return await userPiece.ref.delete();
  }));
}

function decrementPiecesCountInAggregatesDocument() {
  const aggregates = getFirestore().doc(`${Collections.aggregates}/main`);

  return Helpers.increment(aggregates, 'piecesCount', -1);
}

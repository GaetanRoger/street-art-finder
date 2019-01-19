import DocumentReference = FirebaseFirestore.DocumentReference;
import {getFirestore} from './getFirestore';

export class Helpers {
  static areObjectsTheSame(object1: object, object2: object): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }

  static artistToArtistPreview(artist, artistId ?: string) {
    return {
      objectID: artistId || artist.objectID,
      name: artist.name,
      images: artist.images
    };
  }

  static artistToAlgoliaObject(artist, artistId: string) {
    const cities = Object.keys(artist.cities)
      .filter(c => artist.cities[c] > 0);
    delete artist.cities;

    return {
      ...artist,
      objectID: artistId,
      cities
    };
  }

  static pieceToAlgoliaObject(piece, pieceId: string) {
    return {
      objectID: pieceId,
      ...piece,
      _geoloc: {
        lat: piece.location.latitude,
        lng: piece.location.longitude
      },
      location: {
        latitude: piece.location.latitude,
        longitude: piece.location.longitude
      },
      _tags: this._booleanMapToArray(piece.tags)
    };
  }

  static pieceToUserPiece(piece, user: string, found: boolean = false, pieceId?: string) {
    return {
      user,
      artist: piece.artist,
      piece: {
        objectID: pieceId || piece.objectID,
        location: piece.location,
        name: piece.name,
        images: piece.images
      },
      found
    };
  }

  static pieceToPiecePreview(piece, pieceId ?: string) {
    return {
      objectID: pieceId || piece.objectID,
      name: piece.name,
      images: piece.images,
      location: piece.location
    };
  }

  static userArtistToAlgoliaObject(userArtist, id: string) {
    return {
      ...userArtist,
      objectID: id
    };
  }

  static increment(ref: DocumentReference, field: string, delta: number) {
    return getFirestore()
      .runTransaction(async t => {
        const aggregates = await t.get(ref);
        t.update(aggregates.ref, {[field]: aggregates.data()[field] + delta});
      });
  }

  private static _booleanMapToArray(map: object): string[] {
    return Object.keys(map)
      .filter(t => map[t] === true);
  }
}

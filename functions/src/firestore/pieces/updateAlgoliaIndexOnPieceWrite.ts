import * as functions from 'firebase-functions';
import {Collections} from '../collections.enum';
import * as algoliasearch from 'algoliasearch';

const env = functions.config();
const algolia = algoliasearch(env.algolia.appId, env.algolia.appKey);
const client = algolia.initIndex(Collections.pieces);

export const createAlgoliaIndexOnPieceCreateFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onCreate((snap, context) => {
        const piece = snap.data();
        const objectId = snap.id;

        return client.addObject({
            objectId,
            ...piece,
            _geoloc: {
                lat: piece.location.latitude,
                lng: piece.location.longitude
            }
        });
    });

export const updateAlgoliaIndexOnPieceUpdateFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onUpdate((snap, context) => {
        const pieceAfter = snap.after.data();
        const pieceBefore = snap.before.data();
        const objectId = snap.after.id;

        if (JSON.stringify(pieceBefore) === JSON.stringify(pieceBefore))
            return null;

        return client.addObject({
            objectId,
            _geoloc: {
                lat: pieceAfter.location._lat,
                lng: pieceAfter.location._long
            },
            ...pieceAfter
        });
    });

export const deleteAlgoliaIndexOnPieceDeleteFunction = functions.firestore
    .document(`${Collections.pieces}/{pieceId}`)
    .onDelete((snap, context) => {
        const objectId = snap.id;

        return client.deleteObject(objectId);
    });
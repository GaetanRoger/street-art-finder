
export function pieceToAlgoliaObject(objectID: string, piece) {
    return {
        objectID,
        ...piece,
        _geoloc: {
            lat: piece.location.latitude,
            lng: piece.location.longitude
        },
        location: {
            latitude: piece.location.latitude,
            longitude: piece.location.longitude
        }
    };
}
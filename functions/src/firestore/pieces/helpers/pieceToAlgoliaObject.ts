export function pieceToAlgoliaObject(objectID: string, piece) {
    const tags: string[] = Object.keys(piece.tags)
        .filter(t => piece.tags[t] === true);

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
        },
        _tags: tags
    };
}
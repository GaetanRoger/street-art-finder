export function userArtistAndPieceToUserPiece(userArtist, piece, found: boolean = false, pieceId: string = null) {
    return {
        user: userArtist.user,
        artist: userArtist.artist,
        piece: {
            objectID: pieceId || piece.objectID,
            name: piece.name,
            images: piece.images
        },
        found
    };
}
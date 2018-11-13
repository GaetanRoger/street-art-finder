import {Image} from '../../../types/image';
import {ArtistPreview} from '../../../types/artist';
import {Geopoint} from '../../../types/geopoint';
import {PieceTags} from '../../../types/piece-tags';
import {Piece} from '../../../types/piece';

const image: Image = {
    low: 'https://via.placeholder.com/500x300',
    normal: 'https://via.placeholder.com/5000x3000'
};

const artist: ArtistPreview = {
    objectID: 'testartistid',
    name: 'Test artist',
    images: {
        horizontal: image
    }
};

const location: Geopoint = {
    latitude: 12,
    longitude: 12
};
const pieceTags: PieceTags = {
    accessible: true,
    vanished: false
};


export const mockPiece: Piece = {
    objectID: 'pieceid',
    name: 'Test piece',
    text: 'Test piece text',
    addedOn: 0,
    artist: artist,
    images: {
        main: image,
        others: []
    },
    location: location,
    tags: pieceTags
};

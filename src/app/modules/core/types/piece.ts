import {ObjectIDable} from './object-idable';
import {ArtistPreview} from './artist';
import {PieceTags} from './piece-tags';
import {Geopoint} from './geopoint';
import {Image} from './image';

export interface PiecePreview extends ObjectIDable {
    name: string;
    location: Geopoint;
    distance?: number;
    images: {
        main: Image;
    };
}

export interface Piece extends PiecePreview {
    text: string;
    addedOn: number;
    artist: ArtistPreview;
    images: {
        main: Image;
        others: string[];
    };
    tags: PieceTags;
}

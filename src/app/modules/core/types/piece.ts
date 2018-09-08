import {ObjectIDable} from './object-idable';
import {ArtistPreview} from './artist';
import {PieceTags} from './piece-tags';
import {Geopoint} from './geopoint';

export interface Piece extends ObjectIDable {
    name: string;
    location: Geopoint;
    text: string;
    addedOn: Date;
    artist: ArtistPreview;
    images: {
        main: string;
        others: string[];
    };
    tags: PieceTags;
}

import {ObjectIDable} from './object-idable';
import {Piece} from './piece';

export interface ArtistPreview extends ObjectIDable {
    name: string;
}

export interface Artist extends ArtistPreview {
    text: string;
    website: string;
    pieces: Piece[];
}

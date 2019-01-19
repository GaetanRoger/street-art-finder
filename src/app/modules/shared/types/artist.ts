import {ObjectIDable} from './object-idable';
import {Piece} from './piece';
import {Image} from './image';

export interface ArtistPreview extends ObjectIDable {
  name: string;
  images?: {
    horizontal: Image;
    vertical?: Image;
  };
}

export interface Artist extends ArtistPreview {
  text: string;
  color?: string;
  website: string;
  pieces: Piece[];
  piecesCount: number;
  cities: { [key: string]: number };
  published: boolean;
  followers: number;
  images: {
    horizontal: Image;
    vertical?: Image;
  };
}

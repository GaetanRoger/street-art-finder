import {ObjectIDable} from './object-idable';
import {ArtistPreview} from './artist';
import {PiecePreview} from './piece';

export interface UserPieceProgression extends ObjectIDable {
    user: string;
    artist: ArtistPreview;
    piece: PiecePreview;
    found: boolean;
}

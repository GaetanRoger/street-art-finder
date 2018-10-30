import {ObjectIDable} from './object-idable';
import {ArtistPreview} from './artist';

export interface UserArtistProgression extends ObjectIDable {
    artist: ArtistPreview;
    user: string;
    score: number;
    maxScore: number;
}

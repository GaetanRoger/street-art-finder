import {User} from '../../../../shared/types/user';
import {UserPieceProgression} from '../../../../shared/types/user-piece-progression';
import {UserArtistProgression} from '../../../../shared/types/user-artist-progression';

export interface AllUserData {
    user: User;
    userPieces: UserPieceProgression[];
    userArtists: UserArtistProgression[];
}

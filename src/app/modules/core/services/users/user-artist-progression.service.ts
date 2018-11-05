import {Injectable} from '@angular/core';
import {User} from '../../../shared/types/user';
import {Observable, of} from 'rxjs';
import {flatMap, take} from 'rxjs/operators';
import {UserArtistProgression} from '../../../shared/types/user-artist-progression';
import {Artist} from '../../../shared/types/artist';
import {UserPieceProgressionService} from './user_piece_progression/user-piece-progression.service';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';
import {FirestoreCruderService} from '../firestore/firestore-cruder/firestore-cruder.service';

@Injectable({
    providedIn: 'root'
})
export class UserArtistProgressionService {
    private readonly COLLECTION = 'users_artists';

    constructor(private readonly pieceProgression: UserPieceProgressionService,
                private readonly finder: FirestoreFinderService,
                private readonly cruder: FirestoreCruderService<UserArtistProgression>) {
    }

    findAll(user: User | Observable<User>): Observable<UserArtistProgression[]> {
        const user$ = user instanceof Observable
            ? user
            : of(user);

        return user$.pipe(
            flatMap(u => u ? this.artistsProgressionFromUserId(u.objectID) : of([])),
        );
    }

    addArtistProgression(user: User, artist: Artist): Observable<string> {
        const progression: UserArtistProgression = {
            artist: {
                objectID: artist.objectID,
                name: artist.name,
                images: artist.images
            },
            user: user.objectID,
            maxScore: artist.piecesCount,
            score: 0,
        };

        return this.cruder.create(this.COLLECTION, progression);
    }

    artistsProgressionFromUserId(userId: string): Observable<UserArtistProgression[]> {
        return this.finder.findFrom<UserArtistProgression>(this.COLLECTION)
            .where('user', '==', userId)
            .run();
    }


    remove(objectID: string): Observable<string> {
        return this.cruder.delete(this.COLLECTION, objectID);
    }

    async markAllPiecesAsFound(progression: UserArtistProgression) {
        const pieces = await this.pieceProgression
            .piecesProgression(progression.artist.objectID, {onlyNotFound: true})
            .pipe(take(1))
            .toPromise();

        return this.pieceProgression.toggleMultipleFounds(
            pieces.map(p => p.objectID),
            true
        );
    }
}

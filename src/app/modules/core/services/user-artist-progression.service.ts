import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../types/user';
import {Observable, of} from 'rxjs';
import {flatMap, map, take, tap} from 'rxjs/operators';
import {ObjectIDInjectorService} from './objectid-injecter/object-i-d-injector.service';
import {UserArtistProgression} from '../types/user-artist-progression';
import {Artist} from '../types/artist';
import {UserPieceProgressionService} from './user_piece_progression/user-piece-progression.service';

@Injectable({
    providedIn: 'root'
})
export class UserArtistProgressionService {
    private readonly COLLECTION = 'users_artists';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<UserArtistProgression>,
                private readonly pieceProgression: UserPieceProgressionService) {
    }

    findAll(user: User | Observable<User>): Observable<UserArtistProgression[]> {
        const user$ = user instanceof Observable
            ? user
            : of(user);

        return user$.pipe(
            flatMap(u => u ? this.artistsProgressionFromUserId(u.objectID) : of([])),
        );
    }

    addArtistProgression(user: User, artist: Artist) {
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

        return this.firestore.collection(this.COLLECTION)
            .add(progression);
    }

    artistsProgressionFromUserId(userId: string): Observable<UserArtistProgression[]> {
        return this.firestore
            .collection<UserArtistProgression>(this.COLLECTION, ref => ref.where('user', '==', userId))
            .snapshotChanges()
            .pipe(
                map(ua => this.objectIDInjecter.injectIntoCollection(ua))
            );
    }


    remove(objectID: string) {
        return this.firestore.collection(this.COLLECTION)
            .doc(objectID)
            .delete();
    }

    private find(objectID: string): Observable<UserArtistProgression> {
        return this.firestore.collection(this.COLLECTION)
            .doc(objectID)
            .snapshotChanges()
            .pipe(
                map(snap => this.objectIDInjecter.injectIntoDoc(snap)),
                tap(_ => console.log('found', _))
            );
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

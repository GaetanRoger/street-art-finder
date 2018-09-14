import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from '../types/user';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {ObjectIDInjecterService} from './objectid-injecter/object-i-d-injecter.service';
import {UserArtistProgression} from '../types/user-artist-progression';

@Injectable({
    providedIn: 'root'
})
export class UserArtistProgressionService {
    private readonly COLLECTION = 'users_artists';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjecterService<UserArtistProgression>) {
    }

    artistsProgression(user: User | Observable<User>): Observable<UserArtistProgression[]> {
        const user$ = user instanceof Observable
            ? user
            : of(user);

        return user$.pipe(
            flatMap(u => this.artistsProgressionFromUserId(u.uid))
        );
    }

    artistsProgressionFromUserId(id: string): Observable<UserArtistProgression[]> {
        return this.firestore.collection<UserArtistProgression>(
            this.COLLECTION,
            ref => ref.where('user', '==', id)
        ).snapshotChanges()
            .pipe(
                map(a => this.objectIDInjecter.injectIntoCollection(a))
            );
    }
}
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {User} from '../types/user';
import {Observable, of} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {ObjectIDInjectorService} from './objectid-injecter/object-i-d-injector.service';
import {UserArtistProgression} from '../types/user-artist-progression';
import {Artist} from '../types/artist';

@Injectable({
    providedIn: 'root'
})
export class UserArtistProgressionService {
    private readonly COLLECTION = 'users_artists';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<UserArtistProgression>) {
    }

    artistsProgression(user: User | Observable<User>): Observable<UserArtistProgression[]> {
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

    artistsProgressionFromUserId(id: string): Observable<UserArtistProgression[]> {
        return this.getFirestoreCollectionFromUserId(id).snapshotChanges()
            .pipe(
                map(a => this.objectIDInjecter.injectIntoCollection(a))
            );
    }


    remove(objectID: string) {
        return this.firestore.collection(this.COLLECTION)
            .doc(objectID)
            .delete();
    }

    private getFirestoreCollectionFromUserId(id: string) {
        return this.firestore.collection<UserArtistProgression>(
            this.COLLECTION,
            ref => ref.where('user', '==', id)
        );
    }
}

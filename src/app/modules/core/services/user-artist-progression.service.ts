import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../types/user';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import {ObjectIDInjectorService} from './objectid-injecter/object-i-d-injector.service';
import {UserArtistProgression} from '../types/user-artist-progression';
import {Artist} from '../types/artist';
import {AlgoliaService} from './algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';

@Injectable({
    providedIn: 'root'
})
export class UserArtistProgressionService {
    private readonly COLLECTION = 'users_artists';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<UserArtistProgression>,
                private readonly algolia: AlgoliaService) {
    }

    artistsProgression(user: User | Observable<User>, query: string = ''): Observable<UserArtistProgression[]> {
        const user$ = user instanceof Observable
            ? user
            : of(user);

        return user$.pipe(
            flatMap(u => u ? this.artistsProgressionFromUserId(u.objectID, query) : of([])),
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

    artistsProgressionFromUserId(userId: string, query: string = ''): Observable<UserArtistProgression[]> {
        const params: QueryParameters = {
            query,
            facetFilters: `user:${userId}`,
            hitsPerPage: 5,
            page: 0
        };

        return this.algolia.query<UserArtistProgression>(this.COLLECTION, params);
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

    private find(objectID: string): Observable<UserArtistProgression> {
        return this.firestore.collection(this.COLLECTION)
            .doc(objectID)
            .snapshotChanges()
            .pipe(
                map(snap => this.objectIDInjecter.injectIntoDoc(snap)),
                tap(_ => console.log('found', _))
            );
    }
}

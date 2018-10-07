import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {User} from '../../types/user';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {UserPieceProgression} from '../../types/user-piece-progression';
import {PiecesProgressionOptions} from './pieces-progression-options';

@Injectable({
    providedIn: 'root'
})
export class UserPieceProgressionService {
    private readonly COLLECTION = 'users_pieces';
    private readonly DEFAULT_OPTIONS: PiecesProgressionOptions = {
        notFoundFirst: true,
        onlyFound: false,
        onlyNotFound: false
    };

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<UserPieceProgression>) {
    }

    piecesProgression(user: User | Observable<User>, options: PiecesProgressionOptions): Observable<UserPieceProgression[]> {
        const opt = options || this.DEFAULT_OPTIONS;

        const user$ = user instanceof Observable
            ? user
            : of(user);

        return user$.pipe(
            flatMap(u => u ? this.artistsProgressionFromUserId(u.objectID, opt) : of([])),
        );
    }

    artistsProgressionFromUserId(id: string, options: PiecesProgressionOptions = {}): Observable<UserPieceProgression[]> {
        const opt = options || this.DEFAULT_OPTIONS;

        return this.getFirestoreCollectionFromUserId(id, opt).snapshotChanges()
            .pipe(
                map(a => this.objectIDInjecter.injectIntoCollection(a))
            );
    }

    toggleFound(progressionId: string, value: boolean) {
        return this.firestore
            .doc(`${this.COLLECTION}/${progressionId}`)
            .update({found: value});
    }

    private getFirestoreCollectionFromUserId(id: string, options: PiecesProgressionOptions = {}) {
        return this.firestore.collection<UserPieceProgression>(
            this.COLLECTION,
            ref => this._addArgumentsFromOptions(ref.where('user', '==', id), options)
        );
    }


    private _addArgumentsFromOptions(query, options: PiecesProgressionOptions) {
        if (options.onlyFound) {
            query = query.where('found', '==', true);
        } else if (options.onlyNotFound) {
            query = query.where('found', '==', false);
        } else if (options.notFoundFirst) {
            query = query.orderBy('found', 'asc');
        }

        return query;
    }
}

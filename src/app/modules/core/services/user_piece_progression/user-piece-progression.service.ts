import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {UserPieceProgression} from '../../types/user-piece-progression';
import {PiecesProgressionOptions} from './pieces-progression-options';
import {UserService} from '../user/user.service';

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
                private readonly objectIDInjecter: ObjectIDInjectorService<UserPieceProgression>,
                private readonly userService: UserService) {
    }

    piecesProgression(artistId: string, options: PiecesProgressionOptions): Observable<UserPieceProgression[]> {
        const opt = options || this.DEFAULT_OPTIONS;

        return this.userService.user().pipe(
            flatMap(u => u ? this.artistsProgressionFromUserId(artistId, u.objectID, opt) : of([])),
        );
    }

    artistsProgressionFromUserId(artistId: string, userId: string, options: PiecesProgressionOptions = {}): Observable<UserPieceProgression[]> {
        const opt = options || this.DEFAULT_OPTIONS;

        return this._getFirestoreCollectionFromUserId(artistId, userId, opt).snapshotChanges()
            .pipe(
                map(a => this.objectIDInjecter.injectIntoCollection(a))
            );
    }

    toggleFound(progressionId: string, value: boolean) {
        return this.firestore
            .doc(`${this.COLLECTION}/${progressionId}`)
            .update({found: value});
    }

    toggleMultipleFounds(progessionids: string[], value: boolean) {
        const batch = this.firestore.firestore.batch();

        progessionids
            .map(pId => this.firestore.doc(`${this.COLLECTION}/${pId}`).ref)
            .forEach(ref => batch.update(ref, {found: value}));

        return batch.commit();
    }

    private _getFirestoreCollectionFromUserId(artistId: string, userId: string, options: PiecesProgressionOptions = {}) {
        return this.firestore.collection<UserPieceProgression>(
            this.COLLECTION,
            ref => this._addArgumentsFromOptions(
                ref.where('user', '==', userId)
                    .where('artist.objectID', '==', artistId),
                options)
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

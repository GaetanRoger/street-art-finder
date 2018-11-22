import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {UserPieceProgression} from '../../../../shared/types/user-piece-progression';
import {PiecesProgressionOptions} from './pieces-progression-options';
import {UserService} from '../user/user.service';
import {FirestoreFinderService} from '../../firestore/firestore-finder/firestore-finder.service';
import {FirestoreCruderService} from '../../firestore/firestore-cruder/firestore-cruder.service';

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
              private readonly userService: UserService,
              private readonly finder: FirestoreFinderService,
              private readonly cruder: FirestoreCruderService<UserPieceProgression>) {
  }

  findAll(userId: string | Observable<string>): Observable<UserPieceProgression[]> {
    const userId$: Observable<string> = typeof userId === 'string'
      ? of(userId)
      : userId;

    return userId$
      .pipe(flatMap(u => this._getFirestoreCollectionFromUserId(null, u)));
  }

  piecesProgression(artistId: string, options: PiecesProgressionOptions): Observable<UserPieceProgression[]> {
    const opt = options || this.DEFAULT_OPTIONS;

    return this.userService.user().pipe(
      flatMap(u => u ? this.artistsProgressionFromUserId(artistId, u.objectID, opt) : of([])),
    );
  }

  artistsProgressionFromUserId(
    artistId: string,
    userId: string,
    options: PiecesProgressionOptions = {}
  ): Observable<UserPieceProgression[]> {
    const opt = options || this.DEFAULT_OPTIONS;

    return this._getFirestoreCollectionFromUserId(artistId, userId, opt);
  }

  toggleFound(progressionId: string, value: boolean): Observable<string> {
    return this.cruder.update(this.COLLECTION, progressionId, {found: value});
  }

  toggleMultipleFounds(progessionIds: string[], value: boolean) {
    const batch = this.firestore.firestore.batch();

    progessionIds
      .map(pId => this.firestore.doc(`${this.COLLECTION}/${pId}`).ref)
      .forEach(ref => batch.update(ref, {found: value}));

    return batch.commit();
  }

  /**
   * @fixme Better artistId optional parameter
   * @param artistId
   * @param userId
   * @param options
   * @private
   */
  private _getFirestoreCollectionFromUserId(artistId: string, userId: string, options: PiecesProgressionOptions = {}) {
    return this.finder.findFrom<UserPieceProgression>(this.COLLECTION)
      .where('user', '==', userId)
      .if(!!artistId).where('artist.objectID', '==', artistId)
      .if(options.onlyFound).where('found', '==', true)
      .if(options.onlyNotFound).where('found', '==', false)
      .if(options.notFoundFirst).orderBy('found', 'asc')
      .run();
  }
}

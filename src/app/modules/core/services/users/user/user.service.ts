import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {UserRolesService} from '../user-roles/user-roles.service';
import {User} from '../../../../shared/types/user';
import {UserCredentials} from '../../../../shared/types/user-credentials';
import {FirestoreFinderService} from '../../firestore/firestore-finder/firestore-finder.service';
import {FirestoreCruderService} from '../../firestore/firestore-cruder/firestore-cruder.service';
import {Findable} from '../../firestore/firestore-finder/interfaces/findable';
import {FirestoreWhere} from '../../firestore/firestore-finder/firestore-where';
import {Implements} from '../../../decorators/implements';
import {AutoImplemented} from '../../../decorators/auto-implemented';
import {AngularFireFunctions} from '@angular/fire/functions';
import {AllUserData} from './all-user-data';

@Injectable({
  providedIn: 'root'
})
@Implements([Findable], 'users')
export class UserService implements Findable<User> {
  @AutoImplemented collection: string;
  @AutoImplemented find: (id: string) => Observable<User>;

  private readonly COLLECTION = 'users';
  private readonly user$: Observable<User>;

  constructor(private readonly auth: AngularFireAuth,
              private readonly userSettings: UserSettingsService,
              private readonly userRoles: UserRolesService,
              private readonly finder: FirestoreFinderService,
              private readonly cruder: FirestoreCruderService<User>,
              private readonly functions: AngularFireFunctions) {
    this.user$ = this.auth.authState
      .pipe(
        switchMap(u => u ? this.find(u.uid) : of(null)),
      );
  }

  register(userCredentials: UserCredentials) {
    return this.auth.auth
      .createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
      .then(c => this._setUserDataForTheFirstTime(c.user.toJSON()));
  }

  async login(userCredentials: UserCredentials) {
    const response = await this.auth.auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
    this._updateUserDataFromLogin(response.user.toJSON());

    return response;
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(u => !!u)
    );
  }

  user(): Observable<User> {
    return this.user$;
  }

  logout(): Promise<void> {
    return this.auth.auth.signOut();
  }

  update(userId: string, data: object): Observable<string> {
    return this.cruder.update(this.COLLECTION, userId, data);
  }

  findAll(where: FirestoreWhere[]): Observable<User[]> {
    return this.finder.findAll<User>(this.COLLECTION, where);
  }


  sendResetEmailLink(userEmail: string): Promise<void> {
    return this.auth.auth.sendPasswordResetEmail(userEmail);
  }

  delete(): Promise<void> {
    return this.auth.auth.currentUser.delete();
  }

  getAllUserData(): Observable<AllUserData> {
    const getAllUserData = this.functions.httpsCallable('getAllUserDataF');
    return getAllUserData({});
  }

  private _updateUserDataFromLogin(user: any): Observable<string> {
    const data: any = {
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    };

    return this.cruder.update(this.COLLECTION, user.uid, data);
  }

  private _setUserDataForTheFirstTime(user: any) {
    const data: User = {
      objectID: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      settings: {...this.userSettings.DEFAULT_SETTINGS},
      roles: {...this.userRoles.DEFAULT_ROLES}
    };

    return this.cruder.create(this.COLLECTION, data)
      .subscribe(
        undefined,
        e => console.log('error while creating user', e)
      );
  }
}

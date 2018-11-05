import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {UserRolesService} from '../user-roles/user-roles.service';
import {User} from '../../../../shared/types/user';
import {UserCredentials} from '../../../../shared/types/user-credentials';
import {FirestoreFinderService} from '../../firestore/firestore-finder/firestore-finder.service';
import {FirestoreCruderService} from '../../firestore/firestore-cruder/firestore-cruder.service';
import {Findable} from '../../firestore/firestore-finder/findable';
import {FirestoreWhere} from '../../firestore/firestore-finder/firestore-where';

@Injectable({
    providedIn: 'root'
})
export class UserService implements Findable<User> {
    private readonly COLLECTION = 'users';
    private readonly user$: Observable<User>;

    constructor(private readonly auth: AngularFireAuth,
                private readonly userSettings: UserSettingsService,
                private readonly userRoles: UserRolesService,
                private readonly finder: FirestoreFinderService,
                private readonly cruder: FirestoreCruderService<User>) {
        this.user$ = this.auth.authState
            .pipe(
                switchMap(u => u ? this.find(u.uid) : of(null)),
            );
    }

    register(userCredentials: UserCredentials) {
        return this.auth.auth
            .createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
            .then(c => this.setUserDataForTheFirstTime(c.user.toJSON()));
    }

    login(userCredentials: UserCredentials) {
        return this.auth.auth
            .signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
            .then(c => this.updateUserDataFromLogin(c.user.toJSON()));
    }

    isLoggedIn(): Observable<boolean> {
        return this.user$.pipe(map(u => !!u));
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

    find(id: string): Observable<User> {
        return this.finder.find<User>(this.COLLECTION, id);
    }

    findAll(where: FirestoreWhere[]): Observable<User[]> {
        return this.finder.findAll<User>(this.COLLECTION, where);
    }


    sendResetEmailLink(userEmail: string): Promise<void> {
        return this.auth.auth.sendPasswordResetEmail(userEmail);
    }

    private updateUserDataFromLogin(user: any): Observable<string> {
        const data: any = {
            email: user.email,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt
        };

        return this.cruder.update(this.COLLECTION, user.uid, data);
    }

    private setUserDataForTheFirstTime(user: any) {
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

    delete(): Promise<void> {
        return this.auth.auth.currentUser.delete();
    }
}

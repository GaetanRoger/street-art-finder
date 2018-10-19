import {Injectable} from '@angular/core';
import {UserCredentials} from '../../types/user-credentials';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {User} from '../../types/user';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {UserSettingsService} from '../user-settings/user-settings.service';
import {UserRolesService} from '../user-roles/user-roles.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly user$: Observable<User>;

    constructor(private readonly auth: AngularFireAuth,
                private readonly firestore: AngularFirestore,
                private readonly userSettings: UserSettingsService,
                private readonly userRoles: UserRolesService,
                private readonly objectIDInjector: ObjectIDInjectorService<User>) {
        this.user$ = this.auth.authState
            .pipe(
                switchMap(u => u ? this.getUser(u.uid) : of(null)),
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

    update(userId: string, data: object) {
        return this.firestore
            .doc<User>(`users/${userId}`)
            .update(data);
    }

    findAll(): Observable<User[]> {
        return this.firestore.collection<User>('users')
            .snapshotChanges()
            .pipe(
                map(u => this.objectIDInjector.injectIntoCollection(u))
            );
    }

    sendResetEmailLink(userEmail: string): Promise<void> {
        return this.auth.auth.sendPasswordResetEmail(userEmail);
    }

    private getUser(id: string): Observable<User> {
        return this.firestore.doc<User>(`users/${id}`)
            .snapshotChanges()
            .pipe(
                map(u => this.objectIDInjector.injectIntoDoc(u))
            );
    }

    private updateUserDataFromLogin(user: any) {
        const data: any = {
            email: user.email,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt
        };

        return this.firestore
            .doc<User>(`users/${user.uid}`)
            .update(data);
    }

    private setUserDataForTheFirstTime(user: any) {
        const data: User = {
            email: user.email,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            lastLoginAt: user.lastLoginAt,
            settings: {...this.userSettings.DEFAULT_SETTINGS},
            roles: {...this.userRoles.DEFAULT_ROLES}
        };

        return this.firestore
            .doc<User>(`users/${user.uid}`)
            .set(data)
            .catch(e => console.log('error while creating user', e));
    }
}

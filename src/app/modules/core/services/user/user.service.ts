import {Injectable} from '@angular/core';
import {UserCredentials} from '../../types/user-credentials';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from '../../types/user';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly auth: AngularFireAuth) {
    }

    register(userCredentials: UserCredentials) {
        return this.auth.auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
    }

    login(userCredentials: UserCredentials) {
        return this.auth.auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
    }

    isLoggedIn(): Observable<boolean> {
        return this.auth.user.pipe(
            map(u => !!u)
        );
    }

    user(): Observable<User> {
        return this.auth.user.pipe(
            map(u => u.toJSON()),
            map(j => j as User)
        );
    }

    logout(): Promise<void> {
        return this.auth.auth.signOut();
    }
}

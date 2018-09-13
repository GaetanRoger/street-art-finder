import {Injectable} from '@angular/core';
import {UserCredentials} from '../../types/user-credentials';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private readonly auth: AngularFireAuth) {
    }

    register(userCredentials: UserCredentials) {
        return this.auth.auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
    }

    user(): Observable<any> {
        return this.auth.user;
    }
}

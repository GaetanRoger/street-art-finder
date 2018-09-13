import {Injectable} from '@angular/core';
import {UserCredentials} from '../../types/user-credentials';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly auth: AngularFireAuth) {
    }

    register(userCredentials: UserCredentials) {
        return this.auth.auth.createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
    }
}

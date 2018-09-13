import {Component} from '@angular/core';
import {UserCredentials} from '../../../core/types/user-credentials';
import {UserService} from '../../../core/services/user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css']
})
export class JoinComponent {
    registering = false;
    registeringFailedMessage: string;

    constructor(private readonly userService: UserService,
                private readonly router: Router) {
    }

    formSubmitted(value: UserCredentials): void {
        this.registering = true;
        this.userService.register(value)
            .then(r => this.router.navigate(['dashboard']))
            .catch(e => this.manageRegisterError(e));
    }

    private manageRegisterError(error: { code: string; }): void {
        switch (error.code) {
            case 'auth/email-already-in-use':
                this.registeringFailedMessage = 'This email address is already in use.';
                break;
            case 'auth/invalid-email':
                this.registeringFailedMessage = 'This email address is invalid.';
                break;
            case 'auth/operation-not-allowed':
                this.registeringFailedMessage = 'Sorry, joining is closed for now; retry later.';
                break;
            case 'auth/weak-password':
                this.registeringFailedMessage = 'Your password is too weak!';
                break;
            default:
                this.registeringFailedMessage = 'An error occurred, please try again.';
                break;
        }
        this.registering = false;
    }
}

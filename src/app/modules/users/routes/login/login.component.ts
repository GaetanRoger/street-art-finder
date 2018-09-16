import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Router} from '@angular/router';
import {UserCredentials} from '../../../core/types/user-credentials';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    login = false;
    loginFailedMessage: string;
    debug = !environment.production;

    constructor(private readonly userService: UserService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.userService.isLoggedIn()
            .subscribe(b => {
                if (b) {
                    this.router.navigate(['/dashboard'], {skipLocationChange: true});
                }
            });
    }


    formSubmitted(value: UserCredentials): void {
        this.login = true;
        this.loginFailedMessage = '';
        this.userService.login(value)
            .then(_ => {
                console.log('user', _);
            })
            .catch(e => this.manageRegisterError(e));
    }

    private manageRegisterError(error: { code: string; }): void {
        switch (error.code) {
            case 'auth/user-disabled':
                this.loginFailedMessage = 'This account has been disabled.';
                break;
            case 'auth/invalid-email':
                this.loginFailedMessage = 'This email address is invalid.';
                break;
            case 'auth/user-not-found':
                this.loginFailedMessage = 'Sorry, we don\'t know this email.';
                break;
            case 'auth/wrong-password':
                this.loginFailedMessage = 'Oops, the password is wrong.';
                break;
            default:
                this.loginFailedMessage = 'An error occurred, please try again.';
                break;
        }
        this.login = false;
    }

}

import {Component, OnInit} from '@angular/core';
import {UserCredentials} from '../../../shared/types/user-credentials';
import {UserService} from '../../../core/services/users/user/user.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
    selector: 'streart-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
    registering = false;
    registeringFailedMessage: string;

    constructor(private readonly userService: UserService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.userService.isLoggedIn()
            .pipe(take(1))
            // No need to unsubscribe; only take 1
            .subscribe(b => {
                if (b) {
                    this.router.navigate(['/dashboard'], {skipLocationChange: true});
                }
            });
    }


    formSubmitted(value: UserCredentials): void {
        this.registering = true;
        this.userService.register(value)
            .then(_ => this.router.navigate(['dashboard']))
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
                console.log('Error', error);
                break;
        }
        this.registering = false;
    }
}

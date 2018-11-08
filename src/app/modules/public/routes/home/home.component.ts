import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../../core/services/users/user/user.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'streat-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    primaryButtonText$: Observable<string>;
    primaryButtonRouterLink$: Observable<string>;
    loggedIn$: Observable<boolean>;

    query: string;

    constructor(private readonly userService: UserService) {
    }

    ngOnInit() {
        this._setupLoggedInObservables();
    }

    private _setupLoggedInObservables() {
        this.loggedIn$ = this.userService.isLoggedIn();
        this.primaryButtonText$ = this.loggedIn$.pipe(
            map(l => l ? 'Dashboard' : 'Join now'),
        );
        this.primaryButtonRouterLink$ = this.loggedIn$.pipe(
            map(l => l ? 'dashboard' : 'users/join')
        );
    }

}

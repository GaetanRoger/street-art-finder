import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../../core/services/users/user/user.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'streart-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    readonly JOIN_NOW_BUTTON_TEXT = 'Join now';
    readonly DASHBOARD_BUTTON_TEXT = 'Dashboard';
    readonly JOIN_NOW_BUTTON_LINK = 'users/join';
    readonly DASHBOARD_BUTTON_LINK = 'dashboard';

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
            map(l => l ? this.DASHBOARD_BUTTON_TEXT : this.JOIN_NOW_BUTTON_TEXT),
        );
        this.primaryButtonRouterLink$ = this.loggedIn$.pipe(
            map(l => l ? this.DASHBOARD_BUTTON_LINK : this.JOIN_NOW_BUTTON_LINK)
        );
    }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/types/user';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    d$: Observable<User>;

    constructor(private readonly userService: UserService) {
    }

    ngOnInit() {
        this.d$ = this.userService.user();
    }

}

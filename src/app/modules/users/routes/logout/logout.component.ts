import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/users/user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'streart-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private readonly userService: UserService,
                private readonly router: Router) {
    }

    ngOnInit() {
        this.userService.logout()
            .then(_ => this.router.navigate(['']));
    }

}

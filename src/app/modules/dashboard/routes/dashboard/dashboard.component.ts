import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Observable} from 'rxjs';
import {UserArtistProgressionService} from '../../../core/services/user-artist-progression.service';
import {UserArtistProgression} from '../../../core/types/user-artist-progression';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    progression$: Observable<UserArtistProgression[]>;


    constructor(private readonly userArtistProgression: UserArtistProgressionService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        const user$ = this.userService.user();
        this.progression$ = this.userArtistProgression.artistsProgression(user$);
    }

}

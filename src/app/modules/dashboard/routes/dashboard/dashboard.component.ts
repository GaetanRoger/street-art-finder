import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserArtistProgressionService} from '../../../core/services/user-artist-progression.service';
import {UserArtistProgression} from '../../../core/types/user-artist-progression';
import {MatTabChangeEvent} from '@angular/material';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    progression$: Observable<UserArtistProgression[]>;

    mapTabBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);


    constructor(private readonly userArtistProgression: UserArtistProgressionService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        const user$ = this.userService.user();
        this.progression$ = this.userArtistProgression.artistsProgression(user$);
    }

    tabChanged(e: MatTabChangeEvent): void {
        const tab1selected = e.index === 1;
        this.mapTabBehaviourSubject.next(tab1selected);
    }

}

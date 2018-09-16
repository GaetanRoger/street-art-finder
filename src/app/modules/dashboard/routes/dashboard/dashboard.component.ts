import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserArtistProgressionService} from '../../../core/services/user-artist-progression.service';
import {UserArtistProgression} from '../../../core/types/user-artist-progression';
import {MatTabChangeEvent} from '@angular/material';
import {ToolbarMenuItem} from '../../../core/components/toolbar/toolbar-menu-item';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    progressions$: Observable<UserArtistProgression[]>;
    menuItems: ToolbarMenuItem[] = [
        {
            text: 'Settings',
            routerLink: ['/users', 'settings']
        },
        {
            text: 'Logout',
            routerLink: ['/users', 'logout']
        }
    ];

    mapTabBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedIndex: number;


    constructor(private readonly userArtistProgression: UserArtistProgressionService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        const user$ = this.userService.user();
        this.progressions$ = this.userArtistProgression.artistsProgression(user$);
        user$.subscribe(u => {
            if (u && u.roles.admin) {
                this.menuItems.push({
                    text: 'Admin',
                    routerLink: '/admin'
                });
            }
        });
    }

    tabChanged(e: MatTabChangeEvent): void {
        this.selectedIndex = e.index;
        const tab1selected = e.index === 1;
        this.mapTabBehaviourSubject.next(tab1selected);
    }

}

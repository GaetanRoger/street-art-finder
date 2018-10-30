import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/users/user/user.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {UserArtistProgressionService} from '../../../core/services/users/user-artist-progression.service';
import {UserArtistProgression} from '../../../shared/types/user-artist-progression';
import {MatTabChangeEvent} from '@angular/material';
import {ToolbarMenuItem} from '../../../shared/components/toolbar/toolbar-menu-item';
import {flatMap, map} from 'rxjs/operators';

@Component({
    selector: 'streat-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    progressions$: Observable<UserArtistProgression[]>;
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    menuItems: ToolbarMenuItem[] = [
        {
            text: 'Settings',
            routerLink: ['/users', 'settings'],
            icon: 'settings'
        },
        {
            text: 'Logout',
            routerLink: ['/users', 'logout'],
            icon: 'exit_to_app'
        }
    ];

    mapTabBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedIndex: number;


    constructor(private readonly userArtistProgression: UserArtistProgressionService,
                private readonly userService: UserService) {
    }


    get title(): Observable<string> {
        return this.filter$
            .pipe(
                map(f => f ? `Filter: ${f}` : 'Dashboard')
            );
    }

    ngOnInit() {
        const user$ = this.userService.user();

        this.progressions$ = combineLatest(user$, this.filter$)
            .pipe(
                flatMap(([user, filt]) => this.userArtistProgression.findAll(user).pipe(map(uas => this.filterByArtistName(uas, filt)))),
                map(uas => uas.sort((ua1, ua2) => ua1.score / ua1.maxScore - ua2.score / ua2.maxScore))
            );

        user$.subscribe(u => {
            if (u && u.roles.admin) {
                this.menuItems.push({
                    text: 'Admin',
                    routerLink: '/admin',
                    icon: 'settings_input_component'
                });
            }
        });
    }

    private filterByArtistName(uas: UserArtistProgression[], filter: string) {
        return uas.filter(
            ua => ua.artist.name.toLowerCase().includes(filter)
        );
    }

    tabChanged(e: MatTabChangeEvent): void {
        this.selectedIndex = e.index;
        const tab1selected = e.index === 1;
        this.mapTabBehaviourSubject.next(tab1selected);
    }

    filterArtist(newFilter: string) {
        this.filter$.next((newFilter || '').toLowerCase().trim());
    }
}

import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {combineLatest, Observable, of} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {UserService} from '../../../core/services/user/user.service';
import {map, startWith, tap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    artists$: Observable<Artist[]>;
    loadingArtists$: Observable<boolean>;

    primaryButtonText$: Observable<string>;
    primaryButtonRouterLink$: Observable<string>;
    loggedIn$: Observable<boolean>;
    hasMore$: Observable<boolean> = of(true);

    private page: number;
    private filter = '';

    constructor(private readonly artistService: ArtistService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        this._resetArtists();
        this.artists$.subscribe(a => console.log('artosts', a));
        this.loadingArtists$ = this.artists$.pipe(
            startWith([]),
            map(a => !a || a.length === 0),
        );

        this.loggedIn$ = this.userService.isLoggedIn()
            .pipe(
                tap(_ => console.log('value', _))
            );
        this.primaryButtonText$ = this.loggedIn$.pipe(
            map(l => l ? 'Dashboard' : 'Join now'),
        );
        this.primaryButtonRouterLink$ = this.loggedIn$.pipe(
            map(l => l ? 'dashboard' : 'users/join')
        );
    }

    setFilter(filter: string): void {
        this.filter = filter || '';
        this._resetArtists();
    }

    loadMoreArtists(): void {
        const newArtists$ = this.artistService.findN(this.filter, ++this.page);
        this.hasMore$ = newArtists$.pipe(map(a => a && a.length > 0));
        this.artists$ = combineLatest(this.artists$, newArtists$)
            .pipe(
                map(([alreadyLoaded, newArtists]) => [...alreadyLoaded, ...newArtists])
            );
    }

    private _resetArtists(): void {
        this.artists$ = this.artistService.findN(this.filter);
        this.page = 0;
    }
}

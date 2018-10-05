import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Observable, of} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {UserService} from '../../../core/services/user/user.service';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    initialLoading = true;

    artists: Artist[];

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
        newArtists$.subscribe(a => this.artists.push(...a));
        this.hasMore$ = newArtists$.pipe(map(a => a && a.length > 0));
    }

    private _resetArtists(): void {
        this.artists = null;
        this.initialLoading = true;
        this.artistService.findN(this.filter)
            .subscribe(a => {
                this.artists = a;
                this.initialLoading = false;
            });
        this.page = 0;
    }
}

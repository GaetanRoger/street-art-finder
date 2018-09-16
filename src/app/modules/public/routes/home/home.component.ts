import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Observable} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {UserService} from '../../../core/services/user/user.service';
import {map, startWith, tap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    artists: Observable<Artist[]>;
    loadingArtists$: Observable<boolean>;
    filter = '';

    primaryButtonText$: Observable<string>;
    primaryButtonRouterLink$: Observable<string>;
    loggedIn$: Observable<boolean>;

    constructor(private readonly artistService: ArtistService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        this.artists = this.artistService.findAll();
        this.loadingArtists$ = this.artists.pipe(
            startWith([]),
            map(a => !a || a.length === 0),
        );

        this.loggedIn$ = this.userService.isLoggedIn()
            .pipe(
                startWith(false),
            );
        this.primaryButtonText$ = this.loggedIn$.pipe(
            map(l => l ? 'Dashboard' : 'Join now'),
        );
        this.primaryButtonRouterLink$ = this.loggedIn$.pipe(
            map(l => l ? 'dashboard' : 'users/join')
        );
    }

    filterArtists(artists: Artist[]): Artist[] {
        return artists
            ? artists.filter(a => this.transformForFilter(a.name).includes(this.filter))
            : [];
    }

    setFilter(filter: string): void {
        this.filter = this.transformForFilter(filter);
    }

    private transformForFilter(str: string): string {
        return str
            ? str.toLocaleLowerCase().replace(' ', '')
            : str;
    }

}

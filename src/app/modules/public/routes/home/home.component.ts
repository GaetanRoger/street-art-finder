import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Observable} from 'rxjs';
import {Artist} from '../../../shared/types/artist';
import {UserService} from '../../../core/services/users/user/user.service';
import {map} from 'rxjs/operators';
import {Paginator} from '../../../core/services/algolia/paginator';

@Component({
    selector: 'streat-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    primaryButtonText$: Observable<string>;
    primaryButtonRouterLink$: Observable<string>;
    loggedIn$: Observable<boolean>;

    artists$: Observable<Artist[]>;
    noMoreToLoad$: Observable<boolean>;
    loading$: Observable<boolean>;

    private _paginator: Paginator<Artist>;

    constructor(private readonly artistService: ArtistService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        this._paginator = this.artistService.paginator();

        this._setupPaginator();
        this._setupLoggedInObservables();
        this.search();
    }

    search(query?: string): void {
        this._paginator.setQuery(query || '');
        this._paginator.reset();
    }

    loadMoreArtists() {
        this._paginator.more();
    }

    private _setupLoggedInObservables() {
        this.loggedIn$ = this.userService.isLoggedIn();
        this.primaryButtonText$ = this.loggedIn$.pipe(
            map(l => l ? 'Dashboard' : 'Join now'),
        );
        this.primaryButtonRouterLink$ = this.loggedIn$.pipe(
            map(l => l ? 'dashboard' : 'users/join')
        );
    }

    private _setupPaginator() {
        this.artists$ = this._paginator.contentChanges;
        this.noMoreToLoad$ = this._paginator.noMoreToLoad;
        this.loading$ = this._paginator.loading;
    }
}

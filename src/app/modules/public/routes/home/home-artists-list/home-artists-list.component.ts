import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Artist} from '../../../../shared/types/artist';
import {Paginator} from '../../../../core/services/algolia/paginator';
import {ArtistService} from '../../../../core/services/artist/artist.service';
import {OnlineService} from '../../../../core/services/online/online.service';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'streat-home-artists-list',
    templateUrl: './home-artists-list.component.html',
    styleUrls: ['./home-artists-list.component.css']
})
export class HomeArtistsListComponent implements OnInit, OnChanges, OnDestroy {
    @Input() query = '';

    artists$: Observable<Artist[]>;
    noMoreToLoad$: Observable<boolean>;
    loading$: Observable<boolean>;

    private _paginator: Paginator<Artist>;
    private _onlineSubscribtion: Subscription;

    constructor(private readonly artistService: ArtistService,
                private readonly online: OnlineService) {
    }

    ngOnInit(): void {
        this._paginator = this.artistService.paginator();

        this._setupPaginator();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this._paginator && changes.query) {
            this.search(this.query);
        }
    }

    ngOnDestroy(): void {
        this._onlineSubscribtion.unsubscribe();
    }

    search(query?: string): void {
        console.log('search');
        this._paginator.setQuery(query || '');
        this._paginator.reset();
    }

    loadMoreArtists() {
        this._paginator.more();
    }

    private _setupPaginator() {
        this.artists$ = this._paginator.contentChanges;
        this.noMoreToLoad$ = this._paginator.noMoreToLoad;
        this.loading$ = this._paginator.loading;
        this._onlineSubscribtion = this.online.onlineChanges
            .pipe(filter(v => v))
            .subscribe(() => this.search(this.query));
    }

}

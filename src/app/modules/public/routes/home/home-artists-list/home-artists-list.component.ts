import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Artist} from '../../../../shared/types/artist';
import {Paginator} from '../../../../core/services/algolia/paginator';
import {ArtistService} from '../../../../core/services/artist/artist.service';

@Component({
    selector: 'streat-home-artists-list',
    templateUrl: './home-artists-list.component.html',
    styleUrls: ['./home-artists-list.component.css']
})
export class HomeArtistsListComponent implements OnInit, OnChanges {
    @Input() query = '';

    artists$: Observable<Artist[]>;
    noMoreToLoad$: Observable<boolean>;
    loading$: Observable<boolean>;

    private _paginator: Paginator<Artist>;

    constructor(private readonly artistService: ArtistService) {
    }

    ngOnInit() {
        this._paginator = this.artistService.paginator();

        this._setupPaginator();
        this.search();
    }

    ngOnChanges() {
        if (this._paginator) {
            this.search(this.query);
        }
    }

    search(query?: string): void {
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
    }

}

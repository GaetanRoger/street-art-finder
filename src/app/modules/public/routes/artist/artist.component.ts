import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Artist} from '../../../shared/types/artist';
import {Piece} from '../../../shared/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Paginator} from '../../../core/services/algolia/paginator';

@Component({
    selector: 'streart-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist$: Observable<Artist>;
    pieces$: Observable<Piece[]>;
    loading$: Observable<boolean>;
    noMoreToLoad$: Observable<boolean>;

    private _paginator: Paginator<Piece>;

    constructor(private readonly route: ActivatedRoute,
                private readonly artistService: ArtistService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
        const artistId = this.route.snapshot.params.id;

        this._findArtist(artistId);
        this._setupPaginator(artistId);

        this.search('');
    }

    loadMore(): void {
        this._paginator.more();
    }

    search(filter: string): void {
        this._paginator.setQuery(filter);
        this._paginator.reset();
    }

    private _findArtist(artistId): void {
        this.artist$ = this.artistService.find(artistId);
    }

    private _setupPaginator(artistId): void {
        this._paginator = this.pieceService.paginator(artistId).setNearestFirst(true);

        this.pieces$ = this._paginator.contentChanges;
        this.noMoreToLoad$ = this._paginator.noMoreToLoad;
        this.loading$ = this._paginator.loading;
    }
}

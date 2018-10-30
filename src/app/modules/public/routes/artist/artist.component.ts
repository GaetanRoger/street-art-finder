import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {ActivatedRoute} from '@angular/router';
import {delay, flatMap, map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Artist} from '../../../shared/types/artist';
import {Piece} from '../../../shared/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';

@Component({
    selector: 'streat-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist$: Observable<Artist>;
    filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    pieces: Piece[] = [];
    loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    noMoreToLoad = false;

    private page = 0;

    constructor(private readonly route: ActivatedRoute,
                private readonly artistService: ArtistService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
        this.artist$ = this.route.params.pipe(
            map(p => p.id),
            flatMap(a => this.artistService.find(a))
        );
        this.filter$
            .pipe(delay(100))
            .subscribe(() => this.loadPieces(true));
    }

    loadPieces(reset: boolean = false): void {
        if (reset) {
            this.page = 0;
            this.pieces = [];
            this.noMoreToLoad = false;
        }

        this.route.params
            .pipe(
                tap(() => this.loading$.next(true)),
                flatMap(param => this.pieceService.search(param.id, this.filter$.value, this.page++, 5)),
                tap(() => this.loading$.next(false))
            )
            .subscribe(p => {
                this.pieces.push(...p);
                if (p.length === 0) {
                    this.noMoreToLoad = true;
                }
            });
    }
}

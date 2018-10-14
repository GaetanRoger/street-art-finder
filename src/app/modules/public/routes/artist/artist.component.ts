import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {Piece} from '../../../core/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist$: Observable<Artist>;
    pieces$: Observable<Piece[]>;
    filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private readonly route: ActivatedRoute,
                private readonly artistService: ArtistService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
        this.artist$ = this.route.params.pipe(
            map(p => p.id),
            flatMap(a => this.artistService.find(a))
        );
        this.pieces$ = combineLatest(this.route.params, this.filter$)
            .pipe(
                flatMap(([param, filter]) => this.pieceService.findAll(param.id, filter)),
                tap(h => console.log('hits', h))
            );
    }
}

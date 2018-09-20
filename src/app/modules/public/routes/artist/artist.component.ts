import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {ActivatedRoute} from '@angular/router';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {Piece} from '../../../core/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist$: Observable<Artist>;
    pieces$: Observable<Piece[]>;
    filter = '';

    constructor(private readonly route: ActivatedRoute,
                private readonly artistService: ArtistService,
                private readonly pieceService: PieceService,
                private readonly storage: AngularFireStorage) {
    }

    ngOnInit() {
        this.artist$ = this.route.params.pipe(
            map(p => p.id),
            flatMap(a => this.artistService.find(a))
        );
        this.pieces$ = this.route.params.pipe(
            map(p => p.id),
            flatMap(id => this.pieceService.findAll(id))
        );
    }

    setFilter(filter: string) {
        this.filter = filter
            ? this.transformForFilter(filter)
            : '';
    }

    filterPieces(pieces: Piece[]): Piece[] {
        return pieces
            ? pieces.filter(p => this.transformForFilter(p.name).includes(this.filter))
            : [];
    }

    private transformForFilter(str: string): string {
        return str
            ? str.toLocaleLowerCase().replace(' ', '')
            : str;
    }
}

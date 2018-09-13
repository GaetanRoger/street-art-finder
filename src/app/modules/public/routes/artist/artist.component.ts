import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {ActivatedRoute} from '@angular/router';
import {delay, flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Artist} from '../../../core/types/artist';
import {Piece} from '../../../core/types/piece';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
    artist$: Observable<Artist>;
    filter = '';

    constructor(private readonly route: ActivatedRoute,
                private readonly artistService: ArtistService) {
    }

    ngOnInit() {
        this.artist$ = this.route.params.pipe(
            map(p => p.id),
            delay(500),
            flatMap(a => this.artistService.find(a, true))
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
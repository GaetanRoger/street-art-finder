import {Injectable} from '@angular/core';
import {Artist} from '../../types/artist';
import {forkJoin, Observable, of} from 'rxjs';
import {artists} from '../../dev-data/dev-data';
import {PieceService} from '../piece/piece.service';
import {map} from 'rxjs/operators';
import {Piece} from '../../types/piece';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    constructor(private readonly pieceService: PieceService) {
    }

    findAll(): Observable<Artist[]> {
        return of(artists);
    }

    find(id: string, withPieces: boolean = false): Observable<Artist> {
        const artist$ = of(artists.find(a => a.objectID === id));
        const pieces$ = this.pieceService.findAll(id);

        return withPieces ?
            this.joinArtistAndPieces(artist$, pieces$)
            : artist$;
    }

    private joinArtistAndPieces(artist$: Observable<Artist>, pieces$: Observable<Piece[]>): Observable<Artist> {
        return forkJoin(artist$, pieces$)
            .pipe(
                map(([artist, pieces]) => {
                    artist.pieces = pieces;
                    return artist;
                })
            );
    }
}

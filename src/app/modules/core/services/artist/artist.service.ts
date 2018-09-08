import {Injectable} from '@angular/core';
import {Artist} from '../../types/artist';
import {combineLatest, merge, Observable, of} from 'rxjs';
import {artists} from '../../dev-data/dev-data';
import {PieceService} from '../piece/piece.service';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    constructor(private readonly pieceService: PieceService) {
    }

    findAll(): Observable<Artist[]> {
        return of(artists);
    }

}

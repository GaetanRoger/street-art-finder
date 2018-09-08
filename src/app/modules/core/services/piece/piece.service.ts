import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Piece} from '../../types/piece';
import {pieces} from '../../dev-data/dev-data';

@Injectable({
    providedIn: 'root'
})
export class PieceService {

    constructor() {
    }

    findAll(artistId: string): Observable<Piece[]> {
        return of(pieces);
    }
}

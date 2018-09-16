import {Injectable} from '@angular/core';
import {Artist} from '../../types/artist';
import {combineLatest, Observable} from 'rxjs';
import {PieceService} from '../piece/piece.service';
import {map, tap} from 'rxjs/operators';
import {Piece} from '../../types/piece';
import {AngularFirestore} from 'angularfire2/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    readonly COLLECTION = 'artists';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<Artist>,
                private readonly pieceService: PieceService) {
    }

    findAll(): Observable<Artist[]> {
        return this.firestore.collection<Artist>(this.COLLECTION)
            .snapshotChanges()
            .pipe(
                // tap(_ => console.log('artist findall')),
                map(s => this.objectIDInjecter.injectIntoCollection(s))
            );
    }

    find(id: string, withPieces: boolean = false): Observable<Artist> {
        const artist$ = this.findOne(id);
        const pieces$ = this.pieceService.findAll(id);

        return withPieces ?
            this.joinArtistAndPieces(artist$, pieces$)
            : artist$;
    }

    private findOne(id: string): Observable<Artist> {
        return this.firestore.collection<Artist>(this.COLLECTION)
            .doc<Artist>(id)
            .snapshotChanges()
            .pipe(
                map(a => this.objectIDInjecter.injectIntoDoc(a)),
                map(a => ({...a, pieces: []}))
            );
    }

    private joinArtistAndPieces(artist$: Observable<Artist>, pieces$: Observable<Piece[]>): Observable<Artist> {
        return combineLatest(artist$, pieces$)
            .pipe(
                map(([artist, pieces]) => {
                    artist.pieces = pieces;
                    return artist;
                }),
            );
    }
}

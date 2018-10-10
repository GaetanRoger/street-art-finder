import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Piece} from '../../types/piece';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';

@Injectable({
    providedIn: 'root'
})
export class PieceService {
    readonly COLLECTION = 'pieces';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<Piece>,
                private readonly algolia: AlgoliaService) {
    }

    findAll(artistId: string, query: string = '', page: number = 0, hitsPerPage: number = 10): Observable<Piece[]> {
        const filters = artistId ? `artist.objectID:${artistId}` : '';

        const parameters: QueryParameters = {
            query,
            filters,
            page,
            hitsPerPage
        };

        return this.algolia.query<Piece>(this.COLLECTION, parameters);
    }

    findAllAndSubscribe(query: string): Observable<Piece[]> {
        return this.findAll('', query)
            .pipe(
                flatMap(pieces => this._combinePiecesFromFirestore(pieces)),
            );
    }

    private _combinePiecesFromFirestore(pieces): Observable<Piece[]> {
        return combineLatest(pieces.map(p => this.find(p.objectID)))
            .pipe(
                map(p => p.filter((pp: Piece) => pp && pp.name)), // We check the piece exists
                tap(p => console.log('pieces', p))
            ) as Observable<Piece[]>;
    }

    find(pieceId: string): Observable<Piece> {
        return this.firestore
            .doc<Piece>(`${this.COLLECTION}/${pieceId}`)
            .snapshotChanges()
            .pipe(
                tap(snap => console.log('exists', snap.payload.exists, snap.payload.data())),
                // filter(snap => snap.payload.exists),
                map(snap => this.objectIDInjecter.injectIntoDoc(snap))
            );
    }

    create(piece: Piece) {
        const id = piece.objectID;
        delete piece.objectID;

        return this.firestore.doc(`${this.COLLECTION}/${id}`)
            .set({
                ...piece
            });
    }

    markAsVanished(pieceId: string, value: boolean = true): Promise<void> {
        return this.firestore.collection(this.COLLECTION)
            .doc(pieceId)
            .update({['tags.vanished']: value});
    }

    delete(pieceId: string): Promise<void> {
        return this.firestore.collection(this.COLLECTION)
            .doc(pieceId)
            .delete();
    }
}

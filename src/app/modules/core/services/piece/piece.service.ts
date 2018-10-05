import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Piece} from '../../types/piece';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
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
        const parameters: QueryParameters = {
            query,
            filters: `artist.objectID:${artistId}`,
            page,
            hitsPerPage
        };

        return this.algolia.query<Piece>(this.COLLECTION, parameters);
    }

    find(pieceId: string): Observable<Piece> {
        return this.firestore
            .doc<Piece>(`${this.COLLECTION}/${pieceId}`)
            .snapshotChanges()
            .pipe(map(snap => this.objectIDInjecter.injectIntoDoc(snap)));
    }

    create(piece: Piece) {
        return this.firestore.doc(`${this.COLLECTION}/${piece.objectID}`)
            .set({
                ...piece,
                objectID: undefined
            });
    }
}

import {Injectable} from '@angular/core';
import {Artist} from '../../types/artist';
import {combineLatest, Observable} from 'rxjs';
import {PieceService} from '../piece/piece.service';
import {map} from 'rxjs/operators';
import {Piece} from '../../types/piece';
import {AngularFirestore} from '@angular/fire/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {FacetQueryResponse} from '../algolia/facet-query-response';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    readonly COLLECTION = 'artists';
    private DEFAULT_FIND_ALL_PARAMS = {
        limit: 5
    };


    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<Artist>,
                private readonly pieceService: PieceService,
                private readonly algolia: AlgoliaService) {
    }

    findAll(query: string = '', params?: { city?: string; limit?: number }): Observable<Artist[]> {
        params = params
            ? {...this.DEFAULT_FIND_ALL_PARAMS, ...params}
            : this.DEFAULT_FIND_ALL_PARAMS;

        const filters = params.city ? `cities:${params.city}` : '';

        const parameters: QueryParameters = {
            query,
            length: params.limit,
            filters
        };

        return this.algolia.query<Artist>(this.COLLECTION, parameters);
    }

    findN(query: string = '', page: number = 0, hitsPerPage: number = 5): Observable<Artist[]> {
        return this.algolia.paginate<Artist>(this.COLLECTION, query, page, hitsPerPage);
    }

    find(id: string, withPieces: boolean = false): Observable<Artist> {
        const artist$ = this.findOne(id);
        const pieces$ = this.pieceService.findAll(id);

        return withPieces ?
            this.joinArtistAndPieces(artist$, pieces$)
            : artist$;
    }

    getAvailableCities(sortByCount: boolean = false): Observable<FacetQueryResponse[]> {
        return this.algolia.facets(this.COLLECTION, 'cities')
            .pipe(
                map(r => sortByCount ? r.sort((r1, r2) => r1.count - r2.count) : r)
            );
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

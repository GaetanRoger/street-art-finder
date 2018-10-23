import {Injectable} from '@angular/core';
import {Artist} from '../../types/artist';
import {combineLatest, Observable} from 'rxjs';
import {PieceService} from '../piece/piece.service';
import {flatMap, map} from 'rxjs/operators';
import {Piece} from '../../types/piece';
import {AngularFirestore} from '@angular/fire/firestore';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {FacetQueryResponse} from '../algolia/facet-query-response';
import {FiltersBuilder} from '../algolia/filters-builder';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {
    readonly COLLECTION = 'artists';
    private DEFAULT_FIND_ALL_PARAMS = {
        limit: 5,
        published: true
    };


    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjector: ObjectIDInjectorService<Artist>,
                private readonly pieceService: PieceService,
                private readonly algolia: AlgoliaService) {
    }

    findAll(query: string = '', params?: { city?: string; limit?: number; published?: boolean }): Observable<Artist[]> {
        params = params
            ? {...this.DEFAULT_FIND_ALL_PARAMS, ...params}
            : this.DEFAULT_FIND_ALL_PARAMS;

        const filters = new FiltersBuilder()
            .add('cities', params.city, !!params.city)
            .add('published', params.published.toString())
            .build();

        const parameters: QueryParameters = {
            query,
            length: params.limit,
            filters
        };

        return this.algolia.query<Artist>(this.COLLECTION, parameters);
    }

    findN(query: string = '', page: number = 0, hitsPerPage: number = 5): Observable<Artist[]> {
        const aQuery: QueryParameters = {
            page,
            hitsPerPage,
            query,
            filters: new FiltersBuilder('published', true.toString()).build()
        };
        return this.algolia.paginate<Artist>(this.COLLECTION, aQuery);
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

    delete(objectID: string) {
        return this.firestore.collection(this.COLLECTION)
            .doc(objectID)
            .delete();
    }

    findAllAndSubscribe(filter: string): Observable<Artist[]> {
        return this.findAll(filter)
            .pipe(
                flatMap(pieces => this._combineArtistsFromFirestore(pieces)),
            );
    }

    private findOne(id: string): Observable<Artist> {
        return this.firestore.collection<Artist>(this.COLLECTION)
            .doc<Artist>(id)
            .snapshotChanges()
            .pipe(
                map(a => this.objectIDInjector.injectIntoDoc(a)),
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

    private _combineArtistsFromFirestore(artists: Artist[]): Observable<Artist[]> {
        return combineLatest(artists.map(p => this.find(p.objectID)))
            .pipe(
                map(p => p.filter((pp: Artist) => pp && pp.name)), // We check the piece exists
            ) as Observable<Artist[]>;
    }
}

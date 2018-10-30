import {Injectable} from '@angular/core';
import {Artist} from '../../../shared/types/artist';
import {combineLatest, Observable} from 'rxjs';
import {PieceService} from '../piece/piece.service';
import {flatMap, map} from 'rxjs/operators';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {FacetQueryResponse} from '../algolia/facet-query-response';
import {FiltersBuilder} from '../algolia/filters-builder';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';
import {Findable} from '../firestore/firestore-finder/findable';
import {FirestoreWhere} from '../firestore/firestore-finder/firestore-where';
import {FirestoreCruderService} from '../firestore/firestore-cruder/firestore-cruder.service';

@Injectable({
    providedIn: 'root'
})
export class ArtistService implements Findable<Artist> {
    readonly COLLECTION = 'artists';
    private DEFAULT_FIND_ALL_PARAMS = {
        limit: 5,
        published: true
    };

    constructor(private readonly pieceService: PieceService,
                private readonly algolia: AlgoliaService,
                private readonly finder: FirestoreFinderService<Artist>,
                private readonly cruder: FirestoreCruderService<Artist>) {
    }

    search(query: string = '', params?: { city?: string; limit?: number; published?: boolean }): Observable<Artist[]> {
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

    searchN(query: string = '', page: number = 0, hitsPerPage: number = 5): Observable<Artist[]> {
        const aQuery: QueryParameters = {
            page,
            hitsPerPage,
            query,
            filters: new FiltersBuilder('published', true.toString()).build()
        };
        return this.algolia.paginate<Artist>(this.COLLECTION, aQuery);
    }

    find(id: string): Observable<Artist> {
        return this.finder.find(this.COLLECTION, id);
    }

    findAll(where: FirestoreWhere[]): Observable<Artist[]> {
        return this.finder.findAll(this.COLLECTION, where);
    }


    getAvailableCities(sortByCount: boolean = false): Observable<FacetQueryResponse[]> {
        return this.algolia.facets(this.COLLECTION, 'cities')
            .pipe(
                map(r => sortByCount ? r.sort((r1, r2) => r1.count - r2.count) : r)
            );
    }

    delete(objectID: string): Observable<string> {
        return this.cruder.delete(this.COLLECTION, objectID);
    }

    findAllAndSubscribe(filter: string): Observable<Artist[]> {
        return this.search(filter)
            .pipe(
                flatMap(pieces => this._combineArtistsFromFirestore(pieces)),
            );
    }

    private _combineArtistsFromFirestore(artists: Artist[]): Observable<Artist[]> {
        return combineLatest(artists.map(p => this.find(p.objectID)))
            .pipe(
                map(p => p.filter((pp: Artist) => pp && pp.name)), // We check the piece exists
            ) as Observable<Artist[]>;
    }
}

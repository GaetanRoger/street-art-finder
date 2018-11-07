import {Injectable} from '@angular/core';
import {Artist} from '../../../shared/types/artist';
import {combineLatest, Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {AlgoliaService} from '../algolia/algolia.service';
import {QueryParameters} from 'algoliasearch';
import {FacetQueryResponse} from '../algolia/facet-query-response';
import {FiltersBuilder} from '../algolia/filters-builder';
import {Findable} from '../firestore/firestore-finder/interfaces/findable';
import {FirestoreWhere} from '../firestore/firestore-finder/firestore-where';
import {AutoImplemented} from '../../decorators/auto-implemented';
import {Deletable} from '../firestore/firestore-cruder/interfaces/deletable';
import {Listable} from '../firestore/firestore-finder/interfaces/listable';
import {Implements} from '../../decorators/implements';


@Injectable({
    providedIn: 'root'
})
@Implements<Artist>([Findable, Listable, Deletable], 'artists')
export class ArtistService implements Findable<Artist>, Listable<Artist>, Deletable<Artist> {
    @AutoImplemented collection: string;
    @AutoImplemented find: (id: string) => Observable<Artist>;
    @AutoImplemented list: (where: FirestoreWhere[]) => Observable<Artist[]>;
    @AutoImplemented delete: (id: string) => Observable<string>;

    private DEFAULT_FIND_ALL_PARAMS = {
        limit: 5,
        published: true
    };

    constructor(private readonly algolia: AlgoliaService) {
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

        return this.algolia.query<Artist>(this.collection, parameters);
    }

    searchN(query: string = '', page: number = 0, hitsPerPage: number = 5): Observable<Artist[]> {
        const aQuery: QueryParameters = {
            page,
            hitsPerPage,
            query,
            filters: new FiltersBuilder('published', true.toString()).build()
        };
        return this.algolia.paginate<Artist>(this.collection, aQuery);
    }


    getAvailableCities(sortByCount: boolean = false): Observable<FacetQueryResponse[]> {
        return this.algolia.facets(this.collection, 'cities')
            .pipe(
                map(r => sortByCount ? r.sort((r1, r2) => r1.count - r2.count) : r)
            );
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

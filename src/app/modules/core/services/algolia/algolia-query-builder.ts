import {ObjectIDable} from '../../../shared/types/object-idable';
import {QueryParameters} from 'algoliasearch';
import {AlgoliaService} from './algolia.service';
import {Observable} from 'rxjs';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';
import {debounceTime, flatMap, map, take} from 'rxjs/operators';

export class AlgoliaQueryBuilder<T extends ObjectIDable> {
    private readonly _queryParams: QueryParameters = {
        hitsPerPage: 10
    };
    private nearestFirst = false;

    constructor(private readonly index: string,
                private readonly algolia: AlgoliaService,
                private readonly geolocation ?: UserGeolocationService) {
    }

    setQuery(query: string): this {
        this._queryParams.query = query || '';
        return this;
    }

    setHitsPerPage(hitsPerPage: number): this {
        this._queryParams.hitsPerPage = hitsPerPage;
        return this;
    }

    setPage(page: number): this {
        this._queryParams.page = page;
        return this;
    }

    setFilters(filters: string): this {
        this._queryParams.filters = filters;
        return this;
    }

    setNearestFirst(value: boolean): this {
        this.nearestFirst = value;
        return this;
    }

    run(): Observable<T[]> {
        if (!this.nearestFirst) {
            return this.algolia.query<T>(this.index, this._queryParams);
        }
        if (!this.geolocation) {
            console.warn('Cannot query using geolocation: no geolocation service provided.');
            return this.algolia.query<T>(this.index, this._queryParams);
        }

        return this.geolocation.currentGeolocation()
            .pipe(
                debounceTime(100),
                take(1),
                map(loc => {
                    return loc
                        ? {...this._queryParams, aroundLatLng: `${loc.latitude}, ${loc.longitude}`}
                        : this._queryParams;
                }),
                flatMap(param => this.algolia.query<T>(this.index, param))
            );
    }

    build(): QueryParameters {
        return this._queryParams;
    }
}

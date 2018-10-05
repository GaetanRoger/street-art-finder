import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ObjectIDable} from '../../types/object-idable';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as algoliasearch from 'algoliasearch';
import {Client, QueryParameters} from 'algoliasearch';

@Injectable({
    providedIn: 'root'
})
export class AlgoliaService {
    private readonly algolia: Client;

    constructor() {
        this.algolia = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
    }

    client(): algoliasearch.Client {
        return this.algolia;
    }

    query<T extends ObjectIDable>(index: string, query: string | QueryParameters): Observable<T[]> {
        return fromPromise(this.algolia
            .initIndex(index)
            .search(query))
            .pipe(
                map(results => results.hits as T[])
            );
    }

    paginate<T extends ObjectIDable>(index: string, query: string, page: number = 0, hitsPerPage: number = 10): Observable<T[]> {
        const search: QueryParameters = {
            query,
            page,
            hitsPerPage
        };

        console.log('index', index, 'search', search);

        return fromPromise(this.algolia
            .initIndex(index)
            .search(search))
            .pipe(
                map(results => results.hits as T[])
            );
    }
}

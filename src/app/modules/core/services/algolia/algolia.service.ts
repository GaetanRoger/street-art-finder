import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ObjectIDable} from '../../../shared/types/object-idable';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as algoliasearch from 'algoliasearch';
import {Client, QueryParameters} from 'algoliasearch';
import {FacetQueryResponse} from './facet-query-response';

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

    query<T extends ObjectIDable>(index: string, query: QueryParameters): Observable<T[]> {
        return fromPromise(this.algolia
            .initIndex(index)
            .search({...query, getRankingInfo: true}))
            .pipe(
                map(results => {
                    const hits = results.hits as (T & { _rankingInfo: any })[];
                    return hits.map(hit => {
                        return hit._rankingInfo.matchedGeoLocation
                            ? this._addDistanceToHit(hit)
                            : hit;
                    });
                })
            );
    }

    paginate<T extends ObjectIDable>(index: string, query: QueryParameters): Observable<T[]> {

        return fromPromise(this.algolia
            .initIndex(index)
            .search(query))
            .pipe(
                map(results => results.hits as T[])
            );
    }

    facets(collection: string, facet: string): Observable<FacetQueryResponse[]> {
        return fromPromise(this.client()
            .searchForFacetValues([{
                indexName: collection,
                params: {
                    facetName: facet,
                    facetQuery: ''
                }
            }]))
            .pipe(
                map(r => r[0].facetHits)
            );
    }

    private _addDistanceToHit(hit) {
        return Object.assign(hit, {distance: hit._rankingInfo.matchedGeoLocation.distance});
    }
}

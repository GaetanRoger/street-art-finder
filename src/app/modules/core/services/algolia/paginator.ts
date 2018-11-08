import {ObjectIDable} from '../../../shared/types/object-idable';
import {BehaviorSubject, Observable} from 'rxjs';
import {AlgoliaService} from './algolia.service';
import {AlgoliaQueryBuilder} from './algolia-query-builder';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';

export class Paginator<T extends ObjectIDable> {
    /**
     * @see {@link contentChanges}
     */
    private readonly _content$: BehaviorSubject<T[]> = new BehaviorSubject([]);

    private readonly _errors$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    /**
     * @see {@link noMoreToLoad}
     */
    private readonly _noMoreToLoad$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * @see {@link loading}
     */
    private readonly _loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    /**
     * Builder used to build and run algolia queries.
     */
    private readonly _queryBuilder: AlgoliaQueryBuilder<T>;

    /**
     * @see {@link currentPage}
     */
    private _currentPage: number;

    /**
     * @param index Algolia index to be used for every query.
     * @param algolia Algolia service.
     * @param geolocation User geolocation service used only if `nearestFirst` is set.
     */
    constructor(private readonly index: string,
                private readonly algolia: AlgoliaService,
                private readonly geolocation?: UserGeolocationService) {
        this._queryBuilder = new AlgoliaQueryBuilder<T>(this.index, this.algolia, this.geolocation);
    }

    /**
     * Observable of content loaded from Algolia.
     *
     * This observable should be you main and only source.
     * It will emit every time you ask for new data, regardless
     * of the specific method used (get, more, reset...).
     *
     * See methods' comments for more information on what will
     * be emitted.
     */
    get contentChanges(): Observable<T[]> {
        return this._content$;
    }

    /**
     * Observable emitting true if there is nothing more to
     * load from Algolia.
     *
     * This observable makes sense only when used with `more()`.
     * For every other method call (get, reset...), it will emit `true`.
     */
    get noMoreToLoad(): Observable<boolean> {
        return this._noMoreToLoad$;
    }

    /**
     * Observable emitting true while a call to Algolia
     * is being performed.
     */
    get loading(): Observable<boolean> {
        return this._loading$;
    }

    /**
     * Current/last page loaded.
     *
     * Here "page" is to be interpreted as Algolia's definition, aka used for pagination.
     */
    get currentPage(): number {
        return this._currentPage;
    }

    get errors(): Observable<any> {
        return this._errors$;
    }

    /**
     * @param query Query string to be used with algolia.
     */
    setQuery(query: string): this {
        this._queryBuilder.setQuery(query);
        return this;
    }

    /**
     * @param hitsPerPage Number of results per page.
     */
    setHitsPerPage(hitsPerPage: number): this {
        this._queryBuilder.setHitsPerPage(hitsPerPage);
        return this;
    }

    /**
     * @param filters Filters used for query.
     */
    setFilters(filters: string): this {
        this._queryBuilder.setFilters(filters);
        return this;
    }

    /**
     * @param value True for the results to be sorted by distance relative to the device location.
     */
    setNearestFirst(value: boolean): this {
        this._queryBuilder.setNearestFirst(value);
        return this;
    }

    /**
     * Perform a fresh query.
     *
     * This query will erase any content and replace it with the
     * result of a query of page 0.
     *
     * @example
     * // This
     * paginator.reset();
     * // is equivalent to this
     * paginator.get(0);
     *
     */
    reset(): void {
        this.get(0);
    }

    /**
     * Load the next page, replacing the current content with the next page content.
     *
     * @example
     * // This
     * paginator.next();
     * // is equivalent to this
     * paginator.get(paginator.currentPage + 1);
     */
    next(): void {
        this.get(this.currentPage + 1);
    }

    /**
     * Load the previous page, replace the current content with the previous page content.
     *
     * If the current page is 0, just refresh the data (staying at page 0).
     *
     * @example
     * // This
     * paginator.previous();
     * // is (approximately) equivalent to this
     * paginator.get(paginator.currentPage - 1);
     */
    previous(): void {
        this.get(Math.max(0, this.currentPage - 1));
    }

    /**
     * Gets a specific page content.
     *
     * @param page Page number.
     *
     * @example
     * // For a given content : [a, b, c, d, e, f, g]
     * // with a hitsPerPage of 2
     * paginator.get(0)     // emits [a, b]
     * paginator.get(2)     // emits [e, f]
     * paginator.get(3)     // emits [g]
     * paginator.get(4)     // emits []
     */
    get(page: number): void {
        this._noMoreToLoad$.next(false);
        this._loading$.next(true);
        this._queryBuilder
            .setPage(page)
            .run()
            .subscribe(r => {
                    this._content$.next(r);
                    this._currentPage = page;
                    this._loading$.next(false);
                },
                err => {
                    this._errors$.next(err);
                    this._loading$.next(false);
                }
            );
    }

    /**
     * Loads the next page and appends the result to the current content.
     *
     * This method is to be used for "load more" buttons, for example in an
     * infinite scroll context.
     *
     * @example
     * // For a given content : [a, b, c, d, e]
     * // with a hitsPerPage of 2
     * paginator.reset();   // emits [a, b]
     * paginator.more();    // emits [a, b, c, d]
     * paginator.more();    // emits [a, b, c, d, e]
     * paginator.more();    // emits [a, b, c, d, e]
     */
    more(): void {
        this._loading$.next(true);
        const newPage = (this._currentPage + 1) || 0;
        this._queryBuilder
            .setPage(newPage)
            .run()
            .subscribe(r => {
                    this._content$.next([...this._content$.value, ...r]);
                    this._currentPage = newPage;

                    if (r.length < this._queryBuilder.build().hitsPerPage) {
                        this._noMoreToLoad$.next(true);
                    }
                    this._loading$.next(false);
                },
                err => {
                    this._errors$.next(err);
                    this._loading$.next(false);
                }
            );
    }
}

import {ObjectIDable} from '../../../../shared/types/object-idable';
import {FirestoreWhere} from '../firestore-finder/firestore-where';
import {FirestoreWhereOperator} from '../firestore-finder/firestore-where-operator';
import {FirestoreFinderService} from '../firestore-finder/firestore-finder.service';
import {Observable} from 'rxjs';

/**
 * Helps you build firestore queries.
 */
export class FirestoreQueryBuilder<T extends ObjectIDable> {
    private readonly _collection: string;
    private readonly _finder: FirestoreFinderService<T>;

    private _where: FirestoreWhere[] = [];
    private _orderBy: { field: string, direction: 'asc' | 'desc' };

    private _nextActionSkipped = false;

    /**
     * @param collection Collection to query.
     * @param cruder Finder service used to query.
     */
    constructor(collection: string, cruder: FirestoreFinderService<T>) {
        this._collection = collection;
        this._finder = cruder;
    }

    /**
     * Adds a where condition if no `if` was true just before.
     *
     * @param field Field to compare to.
     * @param operator Operator to use.
     * @param value Value to compare.
     */
    where(
        field: string,
        operator: FirestoreWhereOperator,
        value: any
    ): this {
        if (this._runThisAction()) {
            this._where.push({field, operator, value});
        }

        return this;
    }

    /**
     * Sets the `order by` value if no `if` was true just before.
     *
     * @param field Field to order.
     * @param direction Direction of order.
     */
    orderBy(field: string, direction: 'desc' | 'asc' = 'asc'): this {
        if (this._runThisAction()) {
            this._orderBy = {field, direction};
        }

        return this;
    }

    /**
     * Adds a condition for the next `where` or `order by`.
     * If the condition resolve to false, the next `where` or `order by` will be skipped.
     *
     * @example
     * // Where will NOT be skipped
     * queryBuilder.where(...);
     * @example
     * // Where will NOT be skipped
     * queryBuilder.if(true).where(...);
     * @example
     * // Where will be skipped
     * queryBuilder.if(false).where(...);
     *
     * @param condition Condition to evaluate.
     */
    if(condition: boolean): this {
        if (!condition) {
            this._nextActionSkipped = true;
        }

        return this;
    }

    run(): Observable<T[]> {
        return this._finder.findAll(this._collection, this._where, this._orderBy);
    }

    private _runThisAction() {
        const value = !this._nextActionSkipped;
        this._nextActionSkipped = false;

        return value;
    }
}

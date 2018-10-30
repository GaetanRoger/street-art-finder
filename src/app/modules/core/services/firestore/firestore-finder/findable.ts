import {Observable} from 'rxjs';
import {FirestoreWhere} from './firestore-where';
import {ObjectIDable} from '../../../../shared/types/object-idable';

export interface Findable<T extends ObjectIDable> {
    /**
     * Find on specific document from Firestore.
     * @param id ID of the document to find.
     */
    find(id: string): Observable<T>;

    /**
     * Find all the documents from Firestore following given conditions.
     * Please avoid calling this method without any conditions.
     * @param where Conditions for query.
     */
    findAll(where: FirestoreWhere[]): Observable<T[]>;
}

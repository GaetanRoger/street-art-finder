import {Observable} from 'rxjs';
import {ObjectIDable} from '../../../../shared/types/object-idable';

export abstract class Findable<T extends ObjectIDable> {

    /**
     * @todo Extract this in another interface.
     */
    collection?: string;

    /**
     * Find on specific document from Firestore.
     * @param id ID of the document to find.
     */
    find: (id: string) => Observable<T>;
}

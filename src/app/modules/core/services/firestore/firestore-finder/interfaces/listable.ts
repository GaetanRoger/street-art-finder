import {ObjectIDable} from '../../../../../shared/types/object-idable';
import {FirestoreWhere} from '../firestore-where';
import {Observable} from 'rxjs';

export class Listable<T extends ObjectIDable> {
    list: (where: FirestoreWhere[]) => Observable<T[]>;
}

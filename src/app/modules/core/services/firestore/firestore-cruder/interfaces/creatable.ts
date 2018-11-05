import {Observable} from 'rxjs';
import {ObjectIDable} from '../../../../../shared/types/object-idable';

export class Creatable<T extends ObjectIDable> {
    create: (document: T) => Observable<string>;
}

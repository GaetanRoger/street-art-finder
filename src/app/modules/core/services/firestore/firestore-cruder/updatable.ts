import {Observable} from 'rxjs';
import {ObjectIDable} from '../../../../shared/types/object-idable';

export class Updatable<T extends ObjectIDable> {
    update: (document: T) => Observable<string>;
}

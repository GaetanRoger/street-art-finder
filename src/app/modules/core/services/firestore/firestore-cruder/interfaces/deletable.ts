import {ObjectIDable} from '../../../../../shared/types/object-idable';
import {Observable} from 'rxjs';

export abstract class Deletable<T extends ObjectIDable> {
    delete: (id: string) => Observable<string>;
}

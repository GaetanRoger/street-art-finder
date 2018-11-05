import {ObjectIDable} from '../../../../shared/types/object-idable';
import {Observable} from 'rxjs';

export interface Deletable<T extends ObjectIDable> {
    delete: (id: string) => Observable<string>;
}

import {FirestoreFinderService} from '../services/firestore/firestore-finder/firestore-finder.service';
import {ObjectIDable} from '../../shared/types/object-idable';
import {Findable} from '../services/firestore/firestore-finder/interfaces/findable';
import {Observable} from 'rxjs';
import {ExtraModuleInjectorService} from '../extra-module-injector.service';
import {AutoImplementParams} from './auto-implement-params';


export class DefaultFindableImplement<T extends ObjectIDable> implements Findable<T> {
    constructor(private readonly params: AutoImplementParams) {
    }

    find = (id: string): Observable<T> => {
        const finder = ExtraModuleInjectorService.get<FirestoreFinderService>(FirestoreFinderService);
        return finder.find<T>(this.params.collection, id);
    };

}

import {Injectable} from '@angular/core';
import {ObjectIDable} from '../../../shared/types/object-idable';

@Injectable({
    providedIn: 'root'
})
export class ObjectIDInjectorService {

    constructor() {
    }

    injectIntoCollection<T extends ObjectIDable>(s: { payload: { doc: { id: string; data: () => T } } }[]): T[] {
        return s.map(ss => this.injectIntoCollectionEntry<T>(ss));
    }

    injectIntoDoc<T extends ObjectIDable>(s: { payload: { id: string; data: () => object; exists: boolean } }): T {
        return {
            ...s.payload.data(),
            objectID: s.payload.id
        } as T;
    }

    private injectIntoCollectionEntry<T extends ObjectIDable>(s: { payload: { doc: { id: string; data: () => any } } }): T {
        return {
            ...s.payload.doc.data(),
            objectID: s.payload.doc.id
        };
    }
}

import {Injectable} from '@angular/core';
import {ObjectIDable} from '../../types/object-idable';

@Injectable({
    providedIn: 'root'
})
export class ObjectIDInjectorService<T extends ObjectIDable> {

    constructor() {
    }

    injectIntoCollection(s: { payload: { doc: { id: string; data: () => T } } }[]): T[] {
        return s.map(ss => this.injectIntoCollectionEntry(ss));
    }

    injectIntoDoc(s: { payload: { id: string; data: () => T & any } }): T {
        return {
            ...s.payload.data(),
            objectID: s.payload.id
        };
    }

    private injectIntoCollectionEntry(s: { payload: { doc: { id: string; data: () => any } } }): T {
        return {
            ...s.payload.doc.data(),
            objectID: s.payload.doc.id
        };
    }
}

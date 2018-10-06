import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
    providedIn: 'root'
})
export class IdGeneratorService {

    constructor(private readonly firestore: AngularFirestore) {
    }

    generateId(): string {
        return this.firestore.createId();
    }
}

import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

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

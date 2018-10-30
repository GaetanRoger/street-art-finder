import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Aggregates} from '../../../shared/types/aggregates';

@Injectable({
    providedIn: 'root'
})
export class AggregatesService {
    private readonly DOC = 'aggregates/main';

    constructor(private readonly firestore: AngularFirestore) {
    }

    getAll(): Observable<Aggregates> {
        return this.firestore.doc<Aggregates>(this.DOC)
            .valueChanges();
    }

}

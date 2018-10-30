import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {ObjectIDInjectorService} from '../../objectid-injecter/object-i-d-injector.service';
import {map} from 'rxjs/operators';
import {ObjectIDable} from '../../../../shared/types/object-idable';
import {FirestoreWhere} from './firestore-where';
import {FirestoreQueryBuilder} from '../firestore-cruder/firestore-query-builder';
import {FirestoreOrderBy} from './firestore-order-by';

@Injectable({
    providedIn: 'root'
})
export class FirestoreFinderService<T extends ObjectIDable> {

    constructor(private readonly firestore: AngularFirestore,
                private readonly injecter: ObjectIDInjectorService<T>) {
    }

    find(collection: string, objectId: string): Observable<T> {
        return this.firestore
            .collection<T>(collection)
            .doc<T>(objectId)
            .snapshotChanges()
            .pipe(
                map(v => this.injecter.injectIntoDoc(v))
            );
    }

    findAll(collection: string, where: FirestoreWhere[] = [], orderBy?: FirestoreOrderBy): Observable<T[]> {
        return this.firestore
            .collection<T>(collection, this._applyWhereAndOrderBy(where, orderBy))
            .snapshotChanges()
            .pipe(
                map(v => this.injecter.injectIntoCollection(v))
            );
    }

    findFrom(collection: string): FirestoreQueryBuilder<T> {
        return new FirestoreQueryBuilder(collection, this);
    }


    private _applyWhereAndOrderBy(where: FirestoreWhere[], orderBy: FirestoreOrderBy) {
        return (ref: CollectionReference): Query => {
            const whered = where.reduce(
                (p, c) => p.where(c.field, c.operator, c.value),
                ref
            );

            return orderBy
                ? whered.orderBy(orderBy.field, orderBy.direction)
                : whered;
        };
    }
}

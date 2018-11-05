import {Injectable} from '@angular/core';
import {ObjectIDable} from '../../../../shared/types/object-idable';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirestoreCruderService<T extends ObjectIDable> {

    constructor(private readonly firestore: AngularFirestore) {
    }

    /**
     * Create a document in a Firestore collection.
     *
     * If the document has a`objectID` field, the value will be used as the document ID.
     * If a document in this collection already has this ID, the document will be overridden.
     *
     * @param collection Collection where to create.
     * @param document Document data to create.
     * @return An observable of the created document ID.
     */
    create(collection: string, document: T): Observable<string> {
        const docId = document.objectID;
        delete document.objectID;

        return docId
            ? this._createFromId<T>(collection, document, docId)
            : this._createFromNothing<T>(collection, document);
    }

    /**
     * Update a document with a collection.
     * Only given fields in `value` will be updated.
     *
     * @param collection Collection where to update.
     * @param objectID ID of the document ot update.
     * @param value Values to update.
     * @return An observable of the updated document ID.
     */
    update(collection: string, objectID: string, value: any): Observable<string> {
        const promise = this.firestore.collection(collection)
            .doc(objectID)
            .update(value);

        return fromPromise(promise).pipe(map(() => objectID));
    }

    /**
     * Delete a document within a collection.
     *
     * @param collection Collection where to delete.
     * @param objectID ID of the document to delete.
     * @return An observable of the delete document ID.
     */
    delete(collection: string, objectID: string): Observable<string> {
        return this._performDeletion<T>(collection, objectID);
    }

    /**
     * Delete another type of document within a collection.
     *
     * This method must only be used when the document to delete
     * does not match with the generic type given to the class.
     *
     * @param collection Collection where to delete.
     * @param objectID ID of the document to delete.
     * @return An observable of the delete document ID.
     */
    deleteOther<S extends ObjectIDable>(collection: string, objectID: string): Observable<string> {
        return this._performDeletion<S>(collection, objectID);
    }

    private _performDeletion<S extends ObjectIDable>(collection: string, objectID: string): Observable<string> {
        const promise = this.firestore.collection<S>(collection)
            .doc(objectID)
            .delete();

        return fromPromise(promise).pipe(map(() => objectID));
    }

    /**
     * Creates a doc using given ID.
     * If a document with the same ID already exists, it will be overridden.
     *
     * @param collection Collection where to create.
     * @param document Document data to create.
     * @param docId Document ID.
     * @private
     */
    private _createFromId<S extends ObjectIDable>(collection: string, document: S, docId: string): Observable<string> {
        const promise = this.firestore.collection<S>(collection).doc(docId).set(document);
        return fromPromise(promise).pipe(map(() => docId));
    }

    /**
     * Creates a document in a collection letting Firestore generate an ID.
     * @param collection Collection where to create.
     * @param document Document data to create.
     * @private
     */
    private _createFromNothing<S extends ObjectIDable>(collection: string, document: S): Observable<string> {
        const promise = this.firestore.collection<S>(collection).add(document);
        return fromPromise(promise).pipe(map(p => p.id));
    }
}

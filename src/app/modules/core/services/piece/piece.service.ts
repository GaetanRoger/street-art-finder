import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Piece} from '../../types/piece';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {ObjectIDInjectorService} from '../objectid-injecter/object-i-d-injector.service';

@Injectable({
    providedIn: 'root'
})
export class PieceService {
    readonly COLLECTION = 'pieces';

    constructor(private readonly firestore: AngularFirestore,
                private readonly objectIDInjecter: ObjectIDInjectorService<Piece>) {
    }

    findAll(artistId: string): Observable<Piece[]> {
        return this.firestore.collection<Piece>(this.COLLECTION, ref => ref.where('artist.objectID', '==', artistId))
            .snapshotChanges()
            .pipe(
                map(p => this.objectIDInjecter.injectIntoCollection(p)),
            );
    }
}

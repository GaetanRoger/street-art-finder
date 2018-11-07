import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Aggregates} from '../../../shared/types/aggregates';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';

@Injectable({
    providedIn: 'root'
})
export class AggregatesService {
    private readonly COLLECTION = 'aggregates';
    private readonly MAIN_DOC = 'main';

    constructor(private readonly finder: FirestoreFinderService) {
    }

    getAll(): Observable<Aggregates> {
        return this.finder.find<Aggregates>(this.COLLECTION, this.MAIN_DOC);
    }
}

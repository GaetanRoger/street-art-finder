import {AggregatesService} from './aggregates.service';
import {of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

describe('AggregatesService', () => {
    const fakeFirestore = {
        doc: (name: string) => ({
            valueChanges: () => of({usersCount: 1, piecesCount: 2, artistsCount: 3})
        })
    };

    let aggregateService: AggregatesService;

    beforeEach(() => {
        aggregateService = new AggregatesService(fakeFirestore as AngularFirestore);
    });

    it('should get aggregates from firestore', (done: DoneFn) => {
        aggregateService.getAll()
            .subscribe(v => {
                expect(v).toEqual({usersCount: 1, piecesCount: 2, artistsCount: 3});
                done();
            });
    });
});

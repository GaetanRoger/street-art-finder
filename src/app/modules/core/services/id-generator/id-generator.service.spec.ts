import {IdGeneratorService} from './id-generator.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('IdGeneratorService', () => {
    const fakeFirestore = {createId: () => 'notSoRandomId'};
    let idGeneratorService: IdGeneratorService;


    beforeEach(() => {
        idGeneratorService = new IdGeneratorService(fakeFirestore as AngularFirestore);
    });

    it('should return the generated id', () => {
        const generatedId = idGeneratorService.generateId();
        expect(generatedId).toEqual('notSoRandomId');
    });
});

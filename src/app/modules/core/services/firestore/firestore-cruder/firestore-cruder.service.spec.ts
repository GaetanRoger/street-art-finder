import {TestBed} from '@angular/core/testing';

import {FirestoreCruderService} from './firestore-cruder.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('FirestoreCruderService', () => {
  let mockFirestore: Partial<AngularFirestore>;

  beforeEach(() => {

    // noinspection TypeScriptUnresolvedVariable
    mockFirestore = {
      collection: () => ({
        doc: () => ({
          delete: () => Promise.resolve(),
          update: () => Promise.resolve(),
          set: () => Promise.resolve(),
        } as any),
        add: () => Promise.resolve({id: 'createdId'})
      } as any)
    };


    return TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: mockFirestore}
      ]
    });
  });

  it('should be created', () => {
    const service: FirestoreCruderService<any> = TestBed.get(FirestoreCruderService);
    expect(service).toBeTruthy();
  });

  it('should return given id when provided on create', async () => {
    const service: FirestoreCruderService<any> = TestBed.get(FirestoreCruderService);

    const returnedId = await service.create('', {objectID: 'id'}).toPromise();

    expect(returnedId).toBe('id');
  });

  it('should return generated id when provided on create', async () => {
    const service: FirestoreCruderService<any> = TestBed.get(FirestoreCruderService);

    const returnedId = await service.create('', {}).toPromise();

    expect(returnedId).toBe('createdId');
  });

  it('should return given id on update', async () => {
    const service: FirestoreCruderService<any> = TestBed.get(FirestoreCruderService);

    const returnedId = await service.update('', 'id', {}).toPromise();

    expect(returnedId).toBe('id');
  });

  it('should return given id on delete', async () => {
    const service: FirestoreCruderService<any> = TestBed.get(FirestoreCruderService);

    const returnedId = await service.delete('', 'id').toPromise();

    expect(returnedId).toBe('id');
  });
});

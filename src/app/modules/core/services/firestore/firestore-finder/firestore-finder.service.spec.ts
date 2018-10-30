import { TestBed } from '@angular/core/testing';

import { FirestoreFinderService } from './firestore-finder.service';

describe('FetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestoreFinderService = TestBed.get(FirestoreFinderService);
    expect(service).toBeTruthy();
  });
});

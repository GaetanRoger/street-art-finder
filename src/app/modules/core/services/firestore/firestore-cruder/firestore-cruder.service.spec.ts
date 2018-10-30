import { TestBed } from '@angular/core/testing';

import { FirestoreCruderService } from './firestore-cruder.service';

describe('FirestoreCruderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestoreCruderService = TestBed.get(FirestoreCruderService);
    expect(service).toBeTruthy();
  });
});

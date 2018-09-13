import { TestBed, inject } from '@angular/core/testing';

import { ObjectIDInjecterService } from './object-i-d-injecter.service';

describe('ObjectIDInjecterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectIDInjecterService]
    });
  });

  it('should be created', inject([ObjectIDInjecterService], (service: ObjectIDInjecterService) => {
    expect(service).toBeTruthy();
  }));
});

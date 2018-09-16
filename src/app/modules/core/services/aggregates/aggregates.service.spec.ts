import { TestBed, inject } from '@angular/core/testing';

import { AggregatesService } from './aggregates.service';

describe('AggregatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregatesService]
    });
  });

  it('should be created', inject([AggregatesService], (service: AggregatesService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CoordinatesCalculusService } from './coordinates-calculus.service';

describe('CoordinatesCalculusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinatesCalculusService]
    });
  });

  it('should be created', inject([CoordinatesCalculusService], (service: CoordinatesCalculusService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { SeededRandomGeneratorService } from './seeded-random-generator.service';

describe('SeededRandomGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeededRandomGeneratorService]
    });
  });

  it('should be created', inject([SeededRandomGeneratorService], (service: SeededRandomGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});

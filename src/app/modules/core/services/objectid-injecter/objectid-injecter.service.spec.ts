import { TestBed, inject } from '@angular/core/testing';

import { ObjectIDInjectorService } from './object-i-d-injector.service';

describe('ObjectIDInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectIDInjectorService]
    });
  });

  it('should be created', inject([ObjectIDInjectorService], (service: ObjectIDInjectorService) => {
    expect(service).toBeTruthy();
  }));
});

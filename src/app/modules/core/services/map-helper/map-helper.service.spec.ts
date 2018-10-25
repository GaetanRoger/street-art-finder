import { TestBed } from '@angular/core/testing';

import { MapHelperService } from './map-helper.service';

describe('MapHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapHelperService = TestBed.get(MapHelperService);
    expect(service).toBeTruthy();
  });
});

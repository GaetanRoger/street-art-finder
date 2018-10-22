import { TestBed } from '@angular/core/testing';

import { AddressFromGeopointService } from './address-from-geopoint.service';

describe('AddressFromGeopointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressFromGeopointService = TestBed.get(AddressFromGeopointService);
    expect(service).toBeTruthy();
  });
});

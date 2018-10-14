import { TestBed } from '@angular/core/testing';

import { UserGeolocationService } from './user-geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGeolocationService = TestBed.get(UserGeolocationService);
    expect(service).toBeTruthy();
  });
});

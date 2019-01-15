import {TestBed} from '@angular/core/testing';

import {UserGeolocationService} from './user-geolocation.service';

describe('UserGeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGeolocationService = TestBed.get(UserGeolocationService);
    expect(service).toBeTruthy();
  });

  it('should return 0 when calculating distance from one point to the same', () => {
    const distance = UserGeolocationService.distance(
      {latitude: 12, longitude: 12},
      {latitude: 12, longitude: 12},
    );

    expect(distance).toBe(0);
  });

  it('should return 0 m when calculating distance from one point to the same and adding unit', () => {
    const distance = UserGeolocationService.distance(
      {latitude: 12, longitude: 12},
      {latitude: 12, longitude: 12},
      true
    );

    expect(distance).toBe('0 m');
  });
});

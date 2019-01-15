import {TestBed} from '@angular/core/testing';

import {MapHelperService} from './map-helper.service';
import {of} from 'rxjs';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';
import {UserService} from '../users/user/user.service';
import {User} from '../../../shared/types/user';
import {SeededRandomGeneratorService} from '../seeded-random-generator/seeded-random-generator.service';
import {CoordinatesCalculusService} from '../location/coordinates-calculus/coordinates-calculus.service';

describe('MapHelperService', () => {
  let userGeolocationServiceMock: Partial<UserGeolocationService>;
  let userServiceMock: Partial<UserService>;

  beforeEach(() => {
    userGeolocationServiceMock = {
      currentGeolocation: () => of({latitude: 12, longitude: 13}),
      geolocationEnabled: () => of(true),
    };

    userServiceMock = {
      user: () => of({settings: {locationApproximation: 0}} as User)
    };

    return TestBed.configureTestingModule({
      providers: [
        {provide: UserGeolocationService, useValue: userGeolocationServiceMock},
        {provide: UserService, useValue: userServiceMock},
        SeededRandomGeneratorService,
        CoordinatesCalculusService
      ]
    });
  });

  it('should be created', () => {
    const service: MapHelperService = TestBed.get(MapHelperService);
    expect(service).toBeTruthy();
  });

  it('should say to show markers when user\'s setting "locationApproximation" is set to 0', (done: DoneFn) => {
    userServiceMock = {user: () => of({settings: {locationApproximation: 0}} as User)};
    TestBed.overrideProvider(UserService, {useValue: userServiceMock});

    const service = TestBed.get(MapHelperService);
    service.shouldShowMarkers().subscribe(r => {
      expect(r).toBeTruthy();
      done();
    });
  });

  it('should not say to show markers when user\'s setting "locationApproximation" is set to 50 (> 0)', (done: DoneFn) => {
    userServiceMock = {user: () => of({settings: {locationApproximation: 50}} as User)};
    TestBed.overrideProvider(UserService, {useValue: userServiceMock});

    const service = TestBed.get(MapHelperService);
    service.shouldShowMarkers().subscribe(r => {
      expect(r).toBeFalsy();
      done();
    });
  });

  it('should not say to show markers when user\'s setting "locationApproximation" is set to 1 (> 0)', (done: DoneFn) => {
    userServiceMock = {user: () => of({settings: {locationApproximation: 1}} as User)};
    TestBed.overrideProvider(UserService, {useValue: userServiceMock});

    const service = TestBed.get(MapHelperService);
    service.shouldShowMarkers().subscribe(r => {
      expect(r).toBeFalsy();
      done();
    });
  });

  it('should create a user marker at user\'s current location', async () => {
    const service: MapHelperService = TestBed.get(MapHelperService);

    const userMarker = await service.userMarker().toPromise();

    expect(userMarker.getLatLng().lat).toBe(12);
    expect(userMarker.getLatLng().lng).toBe(13);
  });

  it('should create a null user marker if user\'s location is not available', async () => {
    userGeolocationServiceMock = {
      currentGeolocation: () => of(null),
      geolocationEnabled: () => of(false),
    };
    TestBed.overrideProvider(UserGeolocationService, {useValue: userGeolocationServiceMock});
    const service: MapHelperService = TestBed.get(MapHelperService);

    const userMarker = await service.userMarker().toPromise();

    expect(userMarker).toBeNull();
  });
});

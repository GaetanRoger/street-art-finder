import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Geopoint} from '../../types/geopoint';
import * as geolib from 'geolib';

@Injectable({
    providedIn: 'root'
})
export class UserGeolocationService {
    private _geolocation$: BehaviorSubject<Geopoint> = new BehaviorSubject(undefined);
    private _geolocationEnabled$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

    constructor() {
        this._ifNavigatorSupportsGeolocation(() => {
            navigator.geolocation.watchPosition(
                _ => this._geolocationEnabled$.next(true),
                err => this._permissionDeniedOrTimeout(err) ? this._geolocationEnabled$.next(false) : null
            );
        });
    }

    currentGeolocation(): Observable<Geopoint> {
        if (!this._geolocation$.value && navigator.geolocation) {
            navigator.geolocation.watchPosition(
                pos => this._geolocation$.next(this._positionToGeopoint(pos)),
                _ => this._geolocation$.next(null),
                {enableHighAccuracy: true, timeout: 3000}
            );
        }

        return this._geolocation$;

    }

    geolocationEnabled(): Observable<boolean> {
        return this._geolocationEnabled$;
    }

    distance(from: Geopoint, to: Geopoint, addUnit: boolean = false): number | string {
        const f = {latitude: from.latitude, longitude: from.longitude};
        const t = {latitude: to.latitude, longitude: to.longitude};

        const distanceInMeters = geolib.getDistance(f, t);

        if (!addUnit) {
            return distanceInMeters;
        }

        if (distanceInMeters < 1_000) {
            return distanceInMeters + ' m';
        } else if (distanceInMeters < 1_000_000) {
            return (distanceInMeters / 1000).toFixed(1) + ' km';
        } else {
            return (distanceInMeters / 1000).toFixed(0) + ' km';
        }
    }

    private _positionToGeopoint(position: Position): Geopoint {
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
    }

    private _ifNavigatorSupportsGeolocation<T>(runnable: () => T): T {
        return runnable();
    }

    private _permissionDeniedOrTimeout(error: PositionError): boolean {
        return error.code === error.PERMISSION_DENIED
            || error.code === error.TIMEOUT;
    }
}

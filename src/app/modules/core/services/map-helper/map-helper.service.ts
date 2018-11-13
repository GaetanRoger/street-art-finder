import {Injectable} from '@angular/core';
import {UserGeolocationService} from '../location/geolocation/user-geolocation.service';
import {Observable} from 'rxjs';
import {LatLng, Marker, TileLayer, tileLayer} from 'leaflet';
import {map} from 'rxjs/operators';
import {Geopoint} from '../../../shared/types/geopoint';
import {UserService} from '../users/user/user.service';
import {CircleBuilder} from './builders/circle-builder';
import {MarkerBuilder} from './builders/marker-builder';
import {SeededRandomGeneratorService} from '../random/seeded-random-generator/seeded-random-generator.service';
import {CoordinatesCalculusService} from '../location/coordinates-calculus/coordinates-calculus.service';

@Injectable({
    providedIn: 'root'
})
export class MapHelperService {
    static readonly MAP_TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    constructor(private readonly userGeolocation: UserGeolocationService,
                private readonly userService: UserService,
                private readonly random: SeededRandomGeneratorService,
                private readonly coordinatesCalculus: CoordinatesCalculusService) {
    }

    /**
     * Transforms a Geopoint to a LatLng object.
     * @param point Point to transform.
     */
    static geopointToLatLng(point: Geopoint): LatLng {
        return new LatLng(point.latitude, point.longitude);
    }

    /**
     * Transforms a LatLng object to a Geopoint.
     * @param point LatLng to transform.
     */
    static latLngToGeopoint(point: LatLng): Geopoint {
        return {
            latitude: point.lat,
            longitude: point.lng
        };
    }

    /**
     * Creates a tile layer with tiles from open street map.
     */
    static tileLayer(): TileLayer {
        return tileLayer(MapHelperService.MAP_TILES_URL);
    }

    /**
     * Provides a new instance of `MarkerBuilder`.
     * @param location
     * @deprecated Use `new MarkerBuilder(loc)` instead.
     */
    static markerBuilder(location: Geopoint): MarkerBuilder {
        return new MarkerBuilder(location);
    }

    /**
     * Provided a new instance of `CircleBuilder`.
     * @param location
     * @deprecated Use `new CircleBuilder(loc)` instead.
     */
    static circleBuilder(location: Geopoint): CircleBuilder {
        return new CircleBuilder(location);
    }

    /**
     * Returns a marker at user's geolocation, or null if geolocation is unavailable.
     */
    userMarker(): Observable<Marker | null> {
        return this.userGeolocation.currentGeolocation().pipe(
            map(g => {
                return g
                    ? new MarkerBuilder(g).setPopupContent(`<strong>You are here</strong>`).build()
                    : null;
            })
        );
    }

    /**
     * Does the user wants to see markers at precise locations?
     */
    shouldShowMarkers(): Observable<boolean> {
        return this.userService
            .user()
            .pipe(map(u => u.settings.locationApproximation === 0));
    }

    randomizeCircleLocation(location: Geopoint, seed: number | string, radius: number): Geopoint {
        const randomNumber = this.random.generate(seed, true);
        const delta = (radius / 2) * Math.sqrt(2) * 0.001;
        return {
            latitude: this.coordinatesCalculus.addMetersToLatitude(location, randomNumber * delta),
            longitude: this.coordinatesCalculus.addMetersToLongitude(location, randomNumber * delta)
        };
    }
}

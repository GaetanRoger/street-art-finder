import {Injectable} from '@angular/core';
import {UserGeolocationService} from '../geolocation/user-geolocation.service';
import {Observable} from 'rxjs';
import {LatLng, Marker, Point, TileLayer, tileLayer} from 'leaflet';
import {map} from 'rxjs/operators';
import {Geopoint} from '../../types/geopoint';
import {UserService} from '../user/user.service';
import {CircleBuilder} from './builders/circle-builder';
import {MarkerBuilder} from './builders/marker-builder';
import {SeededRandomGeneratorService} from '../seeded-random-generator/seeded-random-generator.service';
import {CoordinatesCalculusService} from '../coordinates-calculus/coordinates-calculus.service';

@Injectable({
    providedIn: 'root'
})
export class MapHelperService {
    readonly MAP_TILES_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    readonly POPUP_OFFSET = new Point(0, -40);

    constructor(private readonly userGeolocation: UserGeolocationService,
                private readonly userService: UserService,
                private readonly random: SeededRandomGeneratorService,
                private readonly coordinatesCalculus: CoordinatesCalculusService) {
    }

    /**
     * Creates a tile layer with tiles from open street map.
     * @param zoom
     */
    tileLayer(zoom: number = 18): TileLayer {
        return tileLayer(this.MAP_TILES_URL, {zoom});
    }

    /**
     * Returns a marker at user's geolocation,
     * or null if geolocation is unavailable.
     */
    userMarker(): Observable<Marker | null> {
        return this.userGeolocation.currentGeolocation().pipe(
            map(g => {
                if (!g) {
                    return null;
                }
                return this.markerBuilder(g).setPopupContent(`<strong>You are here</strong>`).build();
            })
        );
    }

    /**
     * Does the user wants to see markers at precise locations?
     */
    showMarkers(): Observable<boolean> {
        return this.userService
            .user()
            .pipe(map(u => u.settings.locationApproximation === 0));
    }

    markerBuilder(location: Geopoint): MarkerBuilder {
        return new MarkerBuilder(location, this);
    }

    circleBuilder(location: Geopoint): CircleBuilder {
        return new CircleBuilder(location, this);
    }

    /**
     * Transforms a Geopoint to a LatLng object.
     * @param point Point to transform.
     */
    geopointToLatLng(point: Geopoint): LatLng {
        return new LatLng(point.latitude, point.longitude);
    }

    latLngToGeopoint(point: LatLng): Geopoint {
        return {
            latitude: point.lat,
            longitude: point.lng
        };
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

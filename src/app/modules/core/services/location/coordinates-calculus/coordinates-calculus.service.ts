import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CoordinatesCalculusService {
    private readonly EARTH_RADIUS = 6_378;

    constructor() {
    }

    addMetersToLongitude(coords: { longitude: number; latitude: number; }, meters: number): number {
        return coords.longitude
            + (meters / this.EARTH_RADIUS)
            * (180 / Math.PI)
            / Math.cos(coords.latitude * Math.PI / 180);
    }

    addMetersToLatitude(coords: { longitude: number; latitude: number; }, meters: number): number {
        return coords.latitude
            + (meters / this.EARTH_RADIUS)
            * (180 / Math.PI);
    }
}

import {Geopoint} from '../../../shared/types/geopoint';
import {LatLng} from 'leaflet';

export class CoordsConverter {
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
}

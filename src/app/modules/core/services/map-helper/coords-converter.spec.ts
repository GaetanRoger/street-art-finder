import {Geopoint} from '../../../shared/types/geopoint';
import {CoordsConverter} from './coords-converter';
import {LatLng} from 'leaflet';

describe('Coords converter tests', () => {
    it('should convert from Geopoint to LatLng', () => {
        const geopoint: Geopoint = {
            latitude: 12,
            longitude: 13
        };

        const latLng = CoordsConverter.geopointToLatLng(geopoint);

        expect(latLng.lat).toBe(geopoint.latitude);
        expect(latLng.lng).toBe(geopoint.longitude);
    });

    it('should convert from LatLng to Geopoint', () => {
        const latLng = new LatLng(12, 13);

        const geopoint = CoordsConverter.latLngToGeopoint(latLng);

        expect(geopoint.latitude).toBe(latLng.lat);
        expect(geopoint.longitude).toBe(latLng.lng);
    });
});

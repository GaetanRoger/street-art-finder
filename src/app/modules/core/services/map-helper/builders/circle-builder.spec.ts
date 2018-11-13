import {CircleBuilder} from './circle-builder';
import {Geopoint} from '../../../../shared/types/geopoint';

const testLoc: Geopoint = {
    latitude: 12,
    longitude: 13
};


describe('Circle builder test', () => {
    it('should build a simple circle with leaflet\'s default radius value if none provided', () => {
        const circle = new CircleBuilder(testLoc).build();

        expect(circle.getLatLng().lat).toBe(testLoc.latitude);
        expect(circle.getLatLng().lng).toBe(testLoc.longitude);

        // 10 is Leaflet's default value if 0 is provided as radius
        // See: https://leafletjs.com/reference-1.3.4.html#circlemarker-radius
        expect(circle.getRadius()).toBe(10);
    });

    it('should build a simple circle with provided radius', () => {
        const circle = new CircleBuilder(testLoc)
            .setRadius(13)
            .build();

        expect(circle.getLatLng().lat).toBe(testLoc.latitude);
        expect(circle.getLatLng().lng).toBe(testLoc.longitude);
        expect(circle.getRadius()).toBe(13);
    });

    it('should build a circle with provided options without overriding given radius', () => {
        const circle = new CircleBuilder(testLoc)
            .setOptions({attribution: 'test attribution'})
            .setRadius(14)
            .build();

        expect(circle.getLatLng().lat).toBe(testLoc.latitude);
        expect(circle.getLatLng().lng).toBe(testLoc.longitude);
        expect(circle.getRadius()).toBe(14);
        expect(circle.getAttribution()).toBe('test attribution');
    });

    it('should build a circle with given popup', () => {
        const circle = new CircleBuilder(testLoc)
            .setPopupContent('Test popup content')
            .build();

        expect(circle.getLatLng().lat).toBe(testLoc.latitude);
        expect(circle.getLatLng().lng).toBe(testLoc.longitude);
        expect(circle.getPopup()).not.toBeUndefined();
        expect(circle.getPopup().getContent()).toBe('Test popup content');
    });

    it('should build a circle with given events', (done: DoneFn) => {
        const circle = new CircleBuilder(testLoc)
            .setEvents({onAdd: () => done()})
            .build();

        expect(circle.listens('add')).toBeTruthy();
        expect(circle.listens('click')).toBeFalsy();

        circle.fire('add');
    });
});

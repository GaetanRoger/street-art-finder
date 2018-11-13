import {TestBed} from '@angular/core/testing';

import {MapHelperService} from './map-helper.service';
import {LatLng} from 'leaflet';

describe('MapHelperService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MapHelperService = TestBed.get(MapHelperService);
        expect(service).toBeTruthy();
    });

    it('should build a marker', () => {
        const service: MapHelperService = TestBed.get(MapHelperService);
        const onAddEvent = () => 1 + 1;
        const mark = MapHelperService.markerBuilder({latitude: 12, longitude: 13})
            .setPopupContent('Popup content')
            .setEvents({onAdd: onAddEvent})
            .setOptions({title: 'title'})
            .build();

        expect(mark.getLatLng).toEqual(new LatLng(12, 13));
        expect(mark.getPopup().getContent).toEqual('Popup content');
    });
});

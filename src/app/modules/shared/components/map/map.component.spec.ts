import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapHelperService} from '../../../core/services/map-helper/map-helper.service';
import {of} from 'rxjs';
import {Circle, FeatureGroup, Layer, Map, Marker} from 'leaflet';

describe('MapComponent', () => {
    let component: MapComponent<any>;
    let fixture: ComponentFixture<MapComponent<any>>;
    let mapHelperSub: Partial<MapHelperService>;

    const _getLayers = (map: Map): Layer[] => {
        const layers: Layer[] = [];
        map.eachLayer(l => layers.push(l));
        return layers;
    };

    const _getFeatureGroup = (): FeatureGroup => {
        const layers = _getLayers(component.map);
        return layers.find(l => l instanceof FeatureGroup);
    };

    beforeEach(async(() => {
        mapHelperSub = {
            userMarker: () => of(new Marker([12, 13])),
            randomizeCircleLocation: (loc, seed, radius) => loc
        };

        TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [LeafletModule],
            providers: [{provide: MapHelperService, useValue: mapHelperSub}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should display user\'s marker by default', () => {
        const map = component.map;
        const layers = _getLayers(map);

        const makerLayers = layers.filter(l => l instanceof Marker);
        expect(makerLayers.length).toEqual(1);

        const userMarker = makerLayers[0] as Marker;
        expect(userMarker.getLatLng().lat).toEqual(12);
        expect(userMarker.getLatLng().lng).toEqual(13);
    });

    it('should not display user`s marker if set to false', () => {
        component.showUserMarker = false;
        fixture.detectChanges();

        const map = component.map;
        const layers = _getLayers(map);

        const makerLayers = layers.filter(l => l instanceof Marker);
        expect(makerLayers.length).toEqual(0);
    });


    it('should display marker layer by default', () => {
        expect(component.layerToShow).toEqual('marker');

        component.showUserMarker = false;
        component.elements = [{
            marker: new Marker([11, 10]),
            circle: new Circle([11, 10], {radius: 10}),
            id: 'id1'
        }];
        fixture.detectChanges();

        const featureGroup = _getFeatureGroup();

        expect(featureGroup).not.toBeUndefined();
        expect(featureGroup.getLayers().length).toBe(1);
        expect(featureGroup.getLayers()[0] instanceof Marker).toBeTruthy();

        const marker: Marker = featureGroup.getLayers()[0] as Marker;
        expect(marker.getLatLng().lat).toBe(11);
        expect(marker.getLatLng().lng).toBe(10);
    });

    it('should display circles if set to true', () => {
        component.showUserMarker = false;
        component.layerToShow = 'circle';
        component.elements = [{
            marker: new Marker([11, 10]),
            circle: new Circle([11, 10], {radius: 10}),
            id: 'id1'
        }];
        fixture.detectChanges();

        const featureGroup = _getFeatureGroup();

        expect(featureGroup).not.toBeUndefined();
        expect(featureGroup.getLayers().length).toBe(1);
        expect(featureGroup.getLayers()[0] instanceof Circle).toBeTruthy();

        const circle: Circle = featureGroup.getLayers()[0] as Circle;
        expect(circle.getLatLng().lat).toBe(11);
        expect(circle.getLatLng().lng).toBe(10);
        expect(circle.getRadius()).toBe(10);
    });
});

import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Geopoint} from '../../../../../shared/types/geopoint';
import {LatLng, Map, Marker, TileLayer} from 'leaflet';
import {MapHelperService} from '../../../../../core/services/map-helper/map-helper.service';
import {CoordsConverter} from '../../../../../core/services/map-helper/coords-converter';

@Component({
    selector: 'streart-admin-add-piece-location-improve',
    templateUrl: './admin-add-piece-location-improve.component.html',
    styleUrls: ['./admin-add-piece-location-improve.component.css']
})
export class AdminAddPieceLocationImproveComponent implements OnInit, OnChanges {
    @Input() location: Geopoint;
    @Output() newLocation: EventEmitter<Geopoint> = new EventEmitter();

    marker: Marker;
    tileLayer: TileLayer;
    map: Map;

    constructor(private readonly mapHelper: MapHelperService,
                private readonly change: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.tileLayer = MapHelperService.tileLayer();
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.location) {
            return;
        }

        const latLng = CoordsConverter.geopointToLatLng(this.location);
        const m = new Marker(latLng, {draggable: true});
        m.on('dragend', (e) => {
            const source = e.target as Marker;
            this.emitNewLoc(source.getLatLng());
            this.change.detectChanges();
            console.log('new natng', source.getLatLng());
        });

        this.marker = m;

        if (this.map) {
            this.map.panTo(this.marker.getLatLng());
        }
    }

    mapReady(map: Map): void {
        this.map = map;

        if (this.marker) {
            this.map.panTo(this.marker.getLatLng());
        }
    }

    emitNewLoc(latLng: LatLng): void {
        const newLoc = CoordsConverter.latLngToGeopoint(latLng);
        this.newLocation.emit(newLoc);
    }

}

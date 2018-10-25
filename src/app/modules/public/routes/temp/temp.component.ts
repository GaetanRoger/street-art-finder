import {Component, OnInit} from '@angular/core';
import {Geopoint} from '../../../core/types/geopoint';
import {circle, Marker, marker} from 'leaflet';
import {MapHelperService} from '../../../core/services/map-helper/map-helper.service';

@Component({
    selector: 'app-temp',
    templateUrl: './temp.component.html',
    styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
    elements: Geopoint[] = [
        {
            latitude: 12.55,
            longitude: 12.55
        },
        {
            latitude: 12.56,
            longitude: 12.55
        }
    ];

    readonly elementToMarker = (g) => marker([g.latitude, g.longitude]);
    readonly elementToCircle = (g) => circle([g.latitude, g.longitude], {radius: 50});

    style = 'marker';

    constructor() {
    }

    ngOnInit() {
    }

    add() {
        this.elements = [...this.elements, {
            latitude: 12.54,
            longitude: 12.55
        }];

        this.style = 'circle';
    }

}

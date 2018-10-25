import {Component, OnInit} from '@angular/core';
import {Geopoint} from '../../../core/types/geopoint';
import {MapElementInput} from '../../../core/components/map/map-element-input';
import {circle, marker} from 'leaflet';

@Component({
    selector: 'app-temp',
    templateUrl: './temp.component.html',
    styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
    elements: MapElementInput[] = [
        {
            id: '1',
            marker: marker([12.55, 12.55]),
            circle: circle([12.55, 12.55], {radius: 50})
        },
        {
            id: '2',
            marker: marker([12.56, 12.55]),
            circle: circle([12.56, 12.55], {radius: 50})
        }
    ];

    style = 'marker';

    constructor() {
    }

    ngOnInit() {
    }

    add() {
        this.elements = [...this.elements, {
            id: '2',
            marker: marker([12.54, 12.55]),
            circle: circle([12.54, 12.55], {radius: 50})
        }];

        this.style = 'circle';
    }

}

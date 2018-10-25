import {circle, Circle, CircleMarkerOptions} from 'leaflet';
import {BaseBuilder} from './base-builder';
import {MapHelperService} from '../map-helper.service';
import {Geopoint} from '../../../types/geopoint';

export class CircleBuilder extends BaseBuilder {
    private radius: number;
    private options: CircleMarkerOptions = {};

    setRadius(value: number): CircleBuilder {
        this.radius = value;
        return this;
    }

    setOptions(options: CircleMarkerOptions): CircleBuilder {
        this.options = options;
        return this;
    }

    build(): Circle {
        const circ = circle(this.mapHelper.geopointToLatLng(this.location), this.radius, this.options);

        this._addPopupIfPopupContent(circ);
        this._addEventsIfEvents(circ);

        return circ;
    }
}

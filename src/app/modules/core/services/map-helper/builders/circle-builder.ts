import {Circle, CircleMarkerOptions} from 'leaflet';
import {BaseBuilder} from './base-builder';
import {CoordsConverter} from '../coords-converter';

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
        if (this.radius) {
            this.options = {...this.options, radius: this.radius};
        }

        const circ = new Circle(CoordsConverter.geopointToLatLng(this.location), this.options);

        this._addPopupIfPopupContent(circ);
        this._addEventsIfEvents(circ);

        return circ;
    }
}

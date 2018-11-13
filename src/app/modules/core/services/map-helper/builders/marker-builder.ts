import {BaseBuilder} from './base-builder';
import {Marker, MarkerOptions} from 'leaflet';
import {CoordsConverter} from '../coords-converter';

export class MarkerBuilder extends BaseBuilder {
    private options: MarkerOptions = {};

    setOptions(value: MarkerOptions): this {
        this.options = value;
        return this;
    }

    build(): Marker {
        const mark = new Marker(CoordsConverter.geopointToLatLng(this.location), this.options);

        this._addEventsIfEvents(mark);
        this._addPopupIfPopupContent(mark);

        return mark;
    }
}

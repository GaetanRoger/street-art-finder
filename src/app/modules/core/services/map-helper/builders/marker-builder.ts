import {BaseBuilder} from './base-builder';
import {marker, Marker, MarkerOptions} from 'leaflet';

export class MarkerBuilder extends BaseBuilder {
    private options: MarkerOptions = {};

    setOptions(value: MarkerOptions): this {
        this.options = value;
        return this;
    }

    build(): Marker {
        const mark = marker(this.mapHelper.geopointToLatLng(this.location), this.options);

        this._addEventsIfEvents(mark);
        this._addPopupIfPopupContent(mark);

        return mark;
    }
}

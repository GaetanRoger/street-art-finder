import {Geopoint} from '../../../types/geopoint';
import {MapHelperService} from '../map-helper.service';
import {LayerEvents} from '../layer-events';
import {Layer} from 'leaflet';

export class BaseBuilder {
    protected readonly location: Geopoint;
    protected events: LayerEvents = {};
    protected popupContent ?: string;

    constructor(
        location: Geopoint,
        protected readonly mapHelper: MapHelperService
    ) {
        this.location = location;
    }

    setEvents(events: LayerEvents): this {
        this.events = events;
        return this;
    }

    setPopupContent(value: string): this {
        this.popupContent = value;
        return this;
    }

    protected _addPopupIfPopupContent<T extends Layer>(layer: T): void {
        if (this.popupContent) {
            layer.bindPopup(this.popupContent).togglePopup();
        }
    }

    protected _addEventsIfEvents<T extends Layer>(layer: T): void {
        if (this.setEvents && this.events.onAdd) {
            layer.on('add', this.events.onAdd);
        }
    }
}
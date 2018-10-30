import {Geopoint} from '../../../../shared/types/geopoint';
import {MapHelperService} from '../map-helper.service';
import {LayerEvents} from '../layer-events';
import {Layer, Point, Popup} from 'leaflet';

export class BaseBuilder {
    protected readonly location: Geopoint;
    protected events: LayerEvents = {};
    protected popupContent ?: string;
    protected offset: Point = new Point(0, -40);

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

    setOffset(point: Point): this {
        this.offset = point;
        return this;
    }

    setPopupContent(value: string): this {
        this.popupContent = value;
        return this;
    }

    protected _addPopupIfPopupContent<T extends Layer>(layer: T): void {
        if (this.popupContent) {
            const popUp = new Popup({offset: this.offset})
                .setContent(this.popupContent);

            layer.bindPopup(popUp).openPopup();
        }
    }

    protected _addEventsIfEvents<T extends Layer>(layer: T): void {
        if (this.events && this.events.onAdd) {
            layer.on('add', this.events.onAdd);
        }
    }
}
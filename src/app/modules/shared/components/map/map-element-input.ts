import {Circle, Marker} from 'leaflet';

export interface MapElementInput {
    id: string | number;
    circle: Circle;
    marker: Marker;
}

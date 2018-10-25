import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {featureGroup, FeatureGroup, Map, Marker, TileLayer} from 'leaflet';
import {Observable} from 'rxjs';
import {MapHelperService} from '../../services/map-helper/map-helper.service';
import {ObjectIDable} from '../../types/object-idable';
import {MapElementInput} from './map-element-input';

const cloneLayer = require('leaflet-clonelayer');

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent<T extends ObjectIDable> implements OnInit, OnChanges {

    /* *************************************************** *
     *           _   _        _ _           _              *
     *      /\  | | | |      (_) |         | |             *
     *     /  \ | |_| |_ _ __ _| |__  _   _| |_ ___  ___   *
     *    / /\ \| __| __| '__| | '_ \| | | | __/ _ \/ __|  *
     *   / ____ \ |_| |_| |  | | |_) | |_| | ||  __/\__ \  *
     *  /_/    \_\__|\__|_|  |_|_.__/ \__,_|\__\___||___/  *
     *                                                     *
     * *************************************************** */

    /*
     *   ___     __   ___
     *  |_ _|   / /  / _ \
     *   | |   / /  | (_) |
     *  |___| /_/    \___/
     *
     */

    /**
     * Elements to be displayed on the map.
     */
    @Input() elements: MapElementInput[];

    /**
     * Layer to show, either marker or circle.
     */
    @Input() layerToShow: 'marker' | 'circle' = 'marker';

    /**
     * True to show the user's marker.
     */
    @Input() showUserMarker = true;

    /**
     * Initial map zoom.
     */
    @Input() zoom = 18;

    /**
     * True to use user's locationApproximation setting.
     */
    @Input() randomizeCircle = true;


    /*
     *   ___      _    _ _
     *  | _ \_  _| |__| (_)__
     *  |  _/ || | '_ \ | / _|
     *  |_|  \_,_|_.__/_|_\__|
     *
     */

    /**
     * Layer containing user's marker.
     */
    userLayer$: Observable<Marker>;


    /**
     * Layer containing background tiles.
     */
    tileLayer: TileLayer;


    /*
     *   ___     _          _
     *  | _ \_ _(_)_ ____ _| |_ ___
     *  |  _/ '_| \ V / _` |  _/ -_)
     *  |_| |_| |_|\_/\__,_|\__\___|
     *
     */

    /**
     * Leaflet map objet.
     */
    private _leafletMap: Map;


    /* ***************************************** *
     *   __  __      _   _               _       *
     *  |  \/  |    | | | |             | |      *
     *  | \  / | ___| |_| |__   ___   __| |___   *
     *  | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|  *
     *  | |  | |  __/ |_| | | | (_) | (_| \__ \  *
     *  |_|  |_|\___|\__|_| |_|\___/ \__,_|___/  *
     *                                           *
     * ***************************************** */

    /*
     *   ___      _    _ _
     *  | _ \_  _| |__| (_)__
     *  |  _/ || | '_ \ | / _|
     *  |_|  \_,_|_.__/_|_\__|
     *
     */

    constructor(private readonly mapHelper: MapHelperService) {
    }

    /**
     * Layer containing elements, either as circles or markers.
     */
    get elementsLayer(): FeatureGroup {
        return this.layerToShow === 'circle'
            ? this._circlesLayer
            : this._markersLayer;
    }

    ngOnInit(): void {
        this.tileLayer = this.mapHelper.tileLayer();
        this.userLayer$ = this.mapHelper.userMarker();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this._leafletMap && this._markersLayer) {
            this._updateFitBounds();
        }
    }

    /**
     * Method called when map is ready to be used.
     * @param map Map object ready to be used.
     */
    mapReady(map: Map): void {
        this._leafletMap = map;

        if (this._markersLayer.getLayers().length > 0) {
            this._leafletMap.fitBounds(this._markersLayer.getBounds());
        }
    }


    /*
     *   ___     _          _
     *  | _ \_ _(_)_ ____ _| |_ ___
     *  |  _/ '_| \ V / _` |  _/ -_)
     *  |_| |_| |_|\_/\__,_|\__\___|
     *
     */

    get _cleanedElements(): MapElementInput[] {
        if (!this.elements) {
            return [];
        }

        this.elements = this.elements.filter(el => !!el);

        return this.elements;
    }

    get _markersLayer(): FeatureGroup {
        return this._createMarkersLayer();
    }

    get _circlesLayer(): FeatureGroup {
        return this._createCirclesLayer();
    }

    /**
     * Creates a feature group containing all markers created from elements.
     * @private
     */
    private _createMarkersLayer(): FeatureGroup {
        return featureGroup(this._cleanedElements.map(el => el.marker));
    }

    /**
     * Creates a feature group containing all circles created from elements.
     * @private
     */
    private _createCirclesLayer(): FeatureGroup {
        return featureGroup(this._cleanedElements.map(el => {
            const circle = el.circle;

            if (!this.randomizeCircle) {
                return circle;
            }

            const location = this.mapHelper.latLngToGeopoint(circle.getLatLng());
            const randomLocation = this.mapHelper.randomizeCircleLocation(location, el.id, circle.getRadius());
            return cloneLayer(circle).setLatLng(this.mapHelper.geopointToLatLng(randomLocation));
        }));
    }

    /**
     * Update fitBounds on map.
     * This method assumes _leafletMap and _markersLayer are not undefined.
     * @private
     */
    private _updateFitBounds() {
        this._leafletMap.fitBounds(this._markersLayer.getBounds());
    }
}

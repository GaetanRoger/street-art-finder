import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Circle, featureGroup, FeatureGroup, Map, Marker, TileLayer} from 'leaflet';
import {Observable} from 'rxjs';
import {MapHelperService} from '../../services/map-helper/map-helper.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent<T> implements OnInit, OnChanges {

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
    @Input() elements: T[];

    /**
     * Function mapping one element to a marker.
     */
    @Input() elementToMarker: (T) => Marker;

    /**
     * Function mapping one element to a circle.
     */
    @Input() elementToCircle: (T) => Circle;

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
     * Layer containing elements, either as circles or markers.
     */
    elementsLayer: FeatureGroup;

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

    /**
     * Group of elements as markers.
     */
    private _markersLayer: FeatureGroup;

    /**
     * Group of elements as circles.
     */
    private _circleLayer: FeatureGroup;


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

    ngOnInit(): void {
        this.tileLayer = this.mapHelper.tileLayer();
        this.userLayer$ = this.mapHelper.userMarker();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._markersLayer = this._createMarkersLayer();
        this._circleLayer = this._createCirclesLayer();

        if (this.layerToShow === 'marker') {
            this._showMarkers();
        } else if (this.layerToShow === 'circle') {
            this._showCircles();
        } else {
            this.elementsLayer = undefined;
            console.warn('Layer to show must either be marker or circle.');
        }

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

        if (this._markersLayer) {
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

    /**
     * Show markers layer.
     * @private
     */
    private _showMarkers() {
        this.elementsLayer = this._markersLayer;
    }

    /**
     * Show circles layer.
     * @private
     */
    private _showCircles() {
        this.elementsLayer = this._circleLayer;
    }

    /**
     * Creates a feature group containing all markers created from elements.
     * @private
     */
    private _createMarkersLayer(): FeatureGroup {
        return featureGroup(this.elements.map(el => this.elementToMarker(el)));
    }

    /**
     * Creates a feature group containing all circles created from elements.
     * @private
     */
    private _createCirclesLayer(): FeatureGroup {
        return featureGroup(this.elements.map(el => this.elementToCircle(el)));
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

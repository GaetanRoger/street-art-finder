import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {featureGroup, FeatureGroup, Map, Marker, TileLayer} from 'leaflet';
import {BehaviorSubject, Observable} from 'rxjs';
import {MapHelperService} from '../../../core/services/map-helper/map-helper.service';
import {ObjectIDable} from '../../types/object-idable';
import {MapElementInput} from './map-element-input';
import {filter} from 'rxjs/operators';
import {CoordsConverter} from '../../../core/services/map-helper/coords-converter';
import {UserGeolocationService} from '../../../core/services/location/geolocation/user-geolocation.service';
import 'leaflet-easybutton';
import {Geopoint} from '../../types/geopoint';
import {LeafletButton} from './leaflet-button';

const cloneLayer = require('leaflet-clonelayer');


@Component({
  selector: 'streart-map',
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
   * Zoom is used only if one element is provided. If many, map will use fitBounds.
   */
  @Input() zoom = 18;

  @Input() refresh: BehaviorSubject<boolean>;

  /**
   * True to use user's locationApproximation setting.
   */
  @Input() randomizeCircle = true;

  @Input() showCurrentPositionButton = true;

  @Input() buttons: LeafletButton[];


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
  private _currentPositionButton: any;
  private _currentPosition$: Observable<Geopoint>;
  private _leafletButtons: any[];


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

  constructor(private readonly mapHelper: MapHelperService,
              private readonly userLocation: UserGeolocationService) {
  }

  /**
   * Layer containing elements, either as circles or markers.
   */
  get elementsLayer(): FeatureGroup {
    return this.layerToShow === 'circle'
      ? this._circlesLayer
      : this._markersLayer;
  }

  get map(): Map {
    return this._leafletMap;
  }

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


  ngOnInit(): void {
    this.tileLayer = MapHelperService.tileLayer();
    this.userLayer$ = this.mapHelper.userMarker();
    this._currentPosition$ = this.userLocation.currentGeolocation();
    this._currentPositionButton = this._createCurrentPositionButton();
    this._leafletButtons = this._createButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._leafletMap && this._markersLayer) {
      this._updateFitBounds();
    }

    if (this.refresh) {
      this.refresh
        .pipe(filter(v => v === true))
        .subscribe(() => this._refreshMap());
    }

    if (changes.showCurrentPositionButton) {
      this._showOrHideCurrentPositionButton();
    }
  }

  /**
   * Method called when map is ready to be used.
   * @param map Map object ready to be used.
   */
  mapReady(map: Map): void {
    this._leafletMap = map;

    this._updateFitBounds();
    this._showOrHideCurrentPositionButton();
    this._leafletButtons.forEach(b => b.addTo(map));
  }

  /*
   *   ___     _          _
   *  | _ \_ _(_)_ ____ _| |_ ___
   *  |  _/ '_| \ V / _` |  _/ -_)
   *  |_| |_| |_|\_/\__,_|\__\___|
   *
   */

  private _createCurrentPositionButton() {
    return L.easyButton(
      {
        states: [{
          stateName: 'default',
          title: 'Zoom on your location',
          icon: '<div style="font-size: 150%;display: flex;justify-content: center;align-items: center;">⌾</div>',
          onClick: (btn, map) => {
            this._currentPosition$
              .pipe(filter(l => !!l))
              .subscribe(l => map.panTo(
                CoordsConverter.geopointToLatLng(l),
                {animate: true, duration: 1}
              ));
          }
        }]
      });
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

      const location = CoordsConverter.latLngToGeopoint(circle.getLatLng());
      const randomLocation = this.mapHelper.randomizeCircleLocation(location, el.id, circle.getRadius());
      return cloneLayer(circle).setLatLng(CoordsConverter.geopointToLatLng(randomLocation));
    }));
  }

  /**
   * Update fitBounds on map.
   * This method assumes _leafletMap and _markersLayer are not undefined.
   * @private
   * @fixme smooth fit bounds not working
   */
  private _updateFitBounds() {
    if (this._leafletMap && this._markersLayer.getLayers().length > 1) {
      this._leafletMap.fitBounds(
        this._markersLayer.getBounds(),
        {animate: true, duration: 5, easeLinearity: 1}
        );
    } else if (this._markersLayer.getLayers().length === 1) {
      this._leafletMap.setView(this._markersLayer.getBounds().getCenter(), this.zoom);
    }
  }

  private _refreshMap() {
    if (this._leafletMap) {
      this._leafletMap.invalidateSize();
      this._updateFitBounds();
    }
  }

  private _showOrHideCurrentPositionButton() {
    if (this._leafletMap) {
      if (this.showCurrentPositionButton) {
        this._currentPosition$
          .pipe(filter(l => !!l))
          .subscribe(() => this._currentPositionButton.addTo(this._leafletMap));
      } else {
        this._currentPositionButton.remove();
      }
    }
  }

  private _createButtons(): any[] {
    return this.buttons.map(b => {
      return L.easyButton(
        {
          position: b.position || 'bottomleft',
          states: [{
            stateName: 'default',
            title: b.title,
            icon: b.icon,
            onClick: b.onClick
          }]
        });
    });
  }
}

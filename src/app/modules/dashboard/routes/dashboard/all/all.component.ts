import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../core/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Circle, FeatureGroup, featureGroup, LatLngBounds, Layer, Map, Marker, TileLayer} from 'leaflet';
import {User} from '../../../../core/types/user';
import {UserGeolocationService} from '../../../../core/services/geolocation/user-geolocation.service';
import {MapHelperService} from '../../../../core/services/map-helper/map-helper.service';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    @Input() selected$: BehaviorSubject<boolean>;

    baseLayer: TileLayer;
    private readonly zoom = 10;
    private user$: Observable<User>;

    pieces$: Observable<Piece[]>;

    layers: Layer[];
    markersLayer$: Observable<FeatureGroup>;
    circlesLayer$: Observable<FeatureGroup>;
    showMarkers$: Observable<boolean>;
    userLayer$: Observable<Marker>;
    options: any;
    fitBounds$: Observable<LatLngBounds>;
    leafletMap: Map;
    lastfb: LatLngBounds;
    moreInfo: BehaviorSubject<Piece> = new BehaviorSubject(null);


    constructor(private readonly progression: UserArtistProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService,
                private readonly changeDetector: ChangeDetectorRef,
                private readonly geolocation: UserGeolocationService,
                private readonly mapHelper: MapHelperService) {
    }

    ngOnInit() {
        this.baseLayer = this.mapHelper.tileLayer();
        this.user$ = this.userService.user();
        this.userLayer$ = this.mapHelper.userMarker();
        this.showMarkers$ = this.mapHelper.showMarkers();
        this.pieces$ = this._getPieces();
        this.markersLayer$ = this._createMarkersLayer();
        this.circlesLayer$ = this._createCirclesLayer();
        this.fitBounds$ = this._createFitBounds();
        this.layers = [this.baseLayer];
        this.options = {
            zoom: this.zoom
        };

        this.selected$.subscribe(v => {
            if (v && this.leafletMap) {
                this.leafletMap.invalidateSize();
                this.leafletMap.fitBounds(this.lastfb);
            }
        });

        this.fitBounds$.subscribe(fb => this.lastfb = fb);
    }

    mapReady(lMap: Map): void {
        this.leafletMap = lMap;
    }

    private _createFitBounds() {
        return this.markersLayer$.pipe(
            map(fg => fg.getBounds())
        );
    }

    private _createMarkersLayer() {
        return this.pieces$.pipe(
            map(pieces => this._createMarkerFeatureGroupFromPieces(pieces))
        );
    }

    private _createCirclesLayer() {
        return this.pieces$.pipe(
            flatMap(pieces => this._createCircleFeatureGroupFromPieces(pieces))
        );
    }

    private _createMarkerFeatureGroupFromPieces(pieces: Piece[]) {
        return featureGroup(
            pieces.map(
                p => this._createMarkerFromPiece(p)
            )
        );
    }

    private _createMarkerFromPiece(p: Piece): Marker {
        return this.mapHelper.markerBuilder(p.location)
            .setOptions({title: p.name, alt: `${p.name} marker`})
            .setPopupContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .setEvents({
                onAdd: () => {
                    this.moreInfo.next(p);
                    this.changeDetector.detectChanges();
                }
            })
            .build();
    }

    private _getPieces() {
        return this.progression.findAll(this.user$)
            .pipe(
                map(uas => uas.map(ua => ua.artist.objectID)),
                flatMap(ids => this._getPiecesByArtistsIds(ids))
            );
    }

    private _getPiecesByArtistsIds(artistsIds: string[]): Observable<Piece[]> {
        const piecesByArtist$ = artistsIds.map(id => this.pieceService.findAll(id));
        return combineLatest(piecesByArtist$)
            .pipe(flatMap(p => p));
    }

    private _createCircleFeatureGroupFromPieces(pieces: Piece[]): Observable<FeatureGroup> {
        return this.user$
            .pipe(
                map(u => featureGroup(
                    pieces.map(p => this._createCircleFromPiece(p, u.settings.locationApproximation))
                ))
            );
    }

    private _createCircleFromPiece(p: Piece, radius: number): Circle {
        return this.mapHelper
            .circleBuilder(p.location)
            .setRadius(radius)
            .setPopupContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .setEvents({
                onAdd: () => {
                    this.moreInfo.next(p);
                    this.changeDetector.detectChanges();
                }
            })
            .build();
    }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../core/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Circle, Layer, Marker, TileLayer} from 'leaflet';
import {User} from '../../../../core/types/user';
import {UserGeolocationService} from '../../../../core/services/geolocation/user-geolocation.service';
import {MapHelperService} from '../../../../core/services/map-helper/map-helper.service';
import {MapElementInput} from '../../../../core/components/map/map-element-input';

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

    pieces$: Observable<MapElementInput[]>;

    layers: Layer[];
    showMarkers$: Observable<boolean>;
    userLayer$: Observable<Marker>;
    options: any;


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
        this.layers = [this.baseLayer];
        this.options = {
            zoom: this.zoom
        };
    }

    private _createMarkerFromPiece(p: Piece): Marker {
        return this.mapHelper.markerBuilder(p.location)
            .setOptions({title: p.name, alt: `${p.name} marker`})
            .setPopupContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .build();
    }

    private _getPieces(): Observable<MapElementInput[]> {
        return this.progression.findAll(this.user$)
            .pipe(
                map(uas => uas.map(ua => ua.artist.objectID)),
                map(ids => this._getPiecesByArtistsIds(ids)),
                flatMap(pieces$ => combineLatest(pieces$, this.user$)),
                map(([ps, u]) => ps.map(p => ({
                    id: p.objectID,
                    circle: this._createCircleFromPiece(p, u.settings.locationApproximation),
                    marker: this._createMarkerFromPiece(p)
                })))
            );
    }

    private _getPiecesByArtistsIds(artistsIds: string[]): Observable<Piece[]> {
        const piecesByArtist$ = artistsIds.map(id => this.pieceService.findAll(id));
        return combineLatest(piecesByArtist$)
            .pipe(flatMap(p => p));
    }

    private _createCircleFromPiece(p: Piece, radius: number): Circle {
        return this.mapHelper
            .circleBuilder(p.location)
            .setRadius(radius)
            .setPopupContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .build();
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {flatMap, map, startWith} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../core/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {FeatureGroup, featureGroup, latLngBounds, LatLngBounds, Layer, Map, marker, tileLayer} from 'leaflet';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    @Input() selected: BehaviorSubject<boolean>;

    private readonly baseLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});
    private readonly zoom = 10;
    private readonly defaultRadius = 50;

    pieces$: Observable<Piece[]>;

    layers: Layer[];
    markersLayer$: Observable<FeatureGroup>;
    options: any;
    fitBounds$: Observable<LatLngBounds>;
    leafletMap: Map;
    lastfb: LatLngBounds;


    constructor(private readonly progression: UserArtistProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
        this.pieces$ = this.getPieces();
        this.markersLayer$ = this.createMarkersLayer();
        this.fitBounds$ = this.createFitBounds();
        this.layers = [this.baseLayer];
        this.options = {
            zoom: this.zoom,
            // center: [45.7534, 4.8433],
            layers: [
                this.baseLayer
            ]
        };

        this.selected.subscribe(v => {
            if (v) {
                this.leafletMap.invalidateSize();
                this.leafletMap.fitBounds(this.lastfb);
            }
        });

        this.fitBounds$.subscribe(fb => this.lastfb = fb);
    }

    private createFitBounds() {
        return this.markersLayer$.pipe(
            map(fg => fg.getBounds())
        );
    }

    private createMarkersLayer() {
        return this.pieces$.pipe(
            map(pieces => this.createFeatureGroupFromPieces(pieces))
        );
    }

    private createFeatureGroupFromPieces(pieces: Piece[]) {
        return featureGroup(
            pieces.map(
                p => marker([p.location.latitude, p.location.longitude])
            )
        );
    }

    private getPieces() {
        return this.progression.artistsProgression(this.userService.user())
            .pipe(
                map(uas => uas.map(ua => ua.artist.objectID)),
                flatMap(ids => this.getPiecesByArtistsIds(ids))
            );
    }

    private getPiecesByArtistsIds(artistsIds: string[]): Observable<Piece[]> {
        const piecesByArtist$ = artistsIds.map(id => this.pieceService.findAll(id));
        return combineLatest(piecesByArtist$)
            .pipe(flatMap(p => p));
    }

    mapReady(lMap: Map): void {
        this.leafletMap = lMap;
    }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../core/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {FeatureGroup, featureGroup, LatLng, LatLngBounds, Layer, Map, Marker, marker, Point, popup, tileLayer} from 'leaflet';

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
    moreInfo: BehaviorSubject<Piece> = new BehaviorSubject(null);


    constructor(private readonly progression: UserArtistProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.pieces$ = this.getPieces();
        this.markersLayer$ = this.createMarkersLayer();
        this.fitBounds$ = this.createFitBounds();
        this.layers = [this.baseLayer];
        this.options = {
            zoom: this.zoom,
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
                p => this.createMarkerFromPiece(p)
            )
        );
    }

    private createMarkerFromPiece(p: Piece): Marker {
        const latLng = new LatLng(p.location.latitude, p.location.longitude);
        const options = {title: p.name, alt: p.name + ' marker'};
        const mark = marker(latLng, options);

        const pop = popup({offset: new Point(0, -40)})
            .setContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .on('add', () => {
                this.moreInfo.next(p);
                this.changeDetector.detectChanges();
            });

        mark.bindPopup(pop).openPopup();

        return mark;
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

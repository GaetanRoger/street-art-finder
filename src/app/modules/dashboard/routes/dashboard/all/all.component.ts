import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../core/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {
    Circle,
    circle,
    FeatureGroup,
    featureGroup,
    LatLng,
    LatLngBounds,
    Layer,
    Map,
    Marker,
    marker,
    Point,
    popup,
    tileLayer
} from 'leaflet';
import {User} from '../../../../core/types/user';

@Component({
    selector: 'app-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    @Input() selected$: BehaviorSubject<boolean>;

    readonly baseLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});
    private readonly zoom = 10;
    private readonly defaultRadius = 50;
    private user$: Observable<User>;

    pieces$: Observable<Piece[]>;

    layers: Layer[];
    markersLayer$: Observable<FeatureGroup>;
    circlesLayer$: Observable<FeatureGroup>;
    showMarkers$: Observable<boolean>;
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
        this.user$ = this.userService.user();
        this.showMarkers$ = this.user$.pipe(map(u => u.settings.locationApproximation === 0));
        this.pieces$ = this.getPieces();
        this.markersLayer$ = this.createMarkersLayer();
        this.circlesLayer$ = this.createCirclesLayer();
        this.fitBounds$ = this.createFitBounds();
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

    private createFitBounds() {
        return this.markersLayer$.pipe(
            map(fg => fg.getBounds())
        );
    }

    private createMarkersLayer() {
        return this.pieces$.pipe(
            map(pieces => this.createMarkerFeatureGroupFromPieces(pieces))
        );
    }

    private createCirclesLayer() {
        return this.pieces$.pipe(
            flatMap(pieces => this.createCircleFeatureGroupFromPieces(pieces))
        );
    }

    private createMarkerFeatureGroupFromPieces(pieces: Piece[]) {
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
        return this.progression.artistsProgression(this.user$)
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

    private createCircleFeatureGroupFromPieces(pieces: Piece[]): Observable<FeatureGroup> {
        return this.user$
            .pipe(
                map(u => featureGroup(
                    pieces.map(p => this.createCircleFromPiece(p, u.settings.locationApproximation))
                ))
            );
    }

    private createCircleFromPiece(p: Piece, radius: number): Circle {
        const latLng = new LatLng(p.location.latitude, p.location.longitude);
        const circ = circle(latLng, radius);

        const pop = popup({offset: new Point(0, -40)})
            .setContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .on('add', () => {
                this.moreInfo.next(p);
                this.changeDetector.detectChanges();
            });

        circ.bindPopup(pop).openPopup();

        return circ;
    }
}

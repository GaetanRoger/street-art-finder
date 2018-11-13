import {Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/users/user-artist-progression.service';
import {UserService} from '../../../../core/services/users/user/user.service';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Piece} from '../../../../shared/types/piece';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Circle, Marker} from 'leaflet';
import {User} from '../../../../shared/types/user';
import {MapHelperService} from '../../../../core/services/map-helper/map-helper.service';
import {MapElementInput} from '../../../../shared/components/map/map-element-input';

@Component({
    selector: 'streat-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
    @Input() selected$: BehaviorSubject<boolean>;

    private user$: Observable<User>;

    pieces$: Observable<MapElementInput[]>;

    showMarkers$: Observable<boolean>;

    constructor(private readonly progression: UserArtistProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService,
                private readonly mapHelper: MapHelperService) {
    }

    ngOnInit() {
        this.user$ = this.userService.user();
        this.showMarkers$ = this.mapHelper.shouldShowMarkers();
        this.pieces$ = this._getPieces();
    }

    private _createMarkerFromPiece(p: Piece): Marker {
        return MapHelperService.markerBuilder(p.location)
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
        const piecesByArtist$ = artistsIds.map(id => this.pieceService.search(id));
        return combineLatest(piecesByArtist$)
            .pipe(flatMap(p => p));
    }

    private _createCircleFromPiece(p: Piece, radius: number): Circle {
        return MapHelperService
            .circleBuilder(p.location)
            .setRadius(radius)
            .setPopupContent(`<strong>${p.name}</strong>, by ${p.artist.name}`)
            .build();
    }
}

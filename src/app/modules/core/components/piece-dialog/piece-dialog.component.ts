import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Piece} from '../../types/piece';
import {UserService} from '../../services/user/user.service';
import {Circle, Marker} from 'leaflet';
import {Observable, of} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {MapElementInput} from '../map/map-element-input';
import {MapHelperService} from '../../services/map-helper/map-helper.service';
import {User} from '../../types/user';
import {Geopoint} from '../../types/geopoint';

@Component({
    selector: 'app-piece-dialog',
    templateUrl: './piece-dialog.component.html',
    styleUrls: ['./piece-dialog.component.css']
})
export class PieceDialogComponent implements OnInit {

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
     *   ___      _    _ _
     *  | _ \_  _| |__| (_)__
     *  |  _/ || | '_ \ | / _|
     *  |_|  \_,_|_.__/_|_\__|
     *
     */

    readonly baseMapsUrl = 'https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=';

    showMarker$: Observable<boolean>;
    pieceMapInput$: Observable<MapElementInput[]>;
    itinaryUrl$: Observable<string>;
    piece: Piece;
    alwaysUseMarker: boolean;


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

    constructor(private readonly dialogRef: MatDialogRef<PieceDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly data: { piece: Piece; alwaysUseMarker: boolean },
                private readonly userService: UserService,
                private readonly mapHelper: MapHelperService) {
        this.piece = this.data.piece;
        this.alwaysUseMarker = this.data.alwaysUseMarker || false;
    }

    ngOnInit() {
        if (!this.piece) {
            console.warn('A piece is needed.');
            return;
        }

        this.showMarker$ = this._shouldShowMarker();
        this.pieceMapInput$ = this._getPieceMapInput();
        this.itinaryUrl$ = this._getItineraryUrl();
    }


    /*
     *   ___     _          _
     *  | _ \_ _(_)_ ____ _| |_ ___
     *  |  _/ '_| \ V / _` |  _/ -_)
     *  |_| |_| |_|\_/\__,_|\__\___|
     *
     */

    private _getPieceMapInput(): Observable<MapElementInput[]> {
        return this._getCircleRadius()
            .pipe(
                map(r => ({
                    id: this.piece.objectID,
                    marker: this._createMarkerFromPiece(this.piece),
                    circle: this._createCircleFromPiece(this.piece, r)
                })),
                map(p => ([p]))
            );
    }

    private _createCircleFromPiece(piece: Piece, radius: number): Circle {
        return this.mapHelper.circleBuilder(piece.location)
            .setRadius(radius)
            .build();
    }

    private _createMarkerFromPiece(piece: Piece): Marker {
        return this.mapHelper.markerBuilder(piece.location).build();
    }

    private _shouldShowMarker() {
        return this.userService.user()
            .pipe(
                map(user => this._shouldShowMarkers(user)),
            );
    }

    private _shouldShowMarkers(user: User) {
        return this.alwaysUseMarker
            || (user && user.settings && user.settings.locationApproximation === 0);
    }

    private _getCircleRadius() {
        return this.userService.user()
            .pipe(
                map(u => u ? u.settings.locationApproximation : 50)
            );
    }

    private _getItineraryUrl(): Observable<string> {
        return this.showMarker$
            .pipe(
                flatMap(s => s ? this._getItineraryUrlForMarker() : this._getItineraryUrlForCicle())
            );
    }

    private _getItineraryUrlForCicle(): Observable<string> {
        return this._getCircleRadius()
            .pipe(
                map(r => this.mapHelper.randomizeCircleLocation(this.piece.location, this.piece.objectID, r)),
                map(l => this._generateItineraryUrl(l))
            );
    }

    private _getItineraryUrlForMarker(): Observable<string> {
        return of(this._generateItineraryUrl(this.piece.location));
    }

    private _generateItineraryUrl(location: Geopoint): string {
        return `${this.baseMapsUrl}${location.latitude},${location.longitude}`;
    }
}

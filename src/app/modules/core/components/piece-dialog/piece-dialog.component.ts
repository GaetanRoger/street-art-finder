import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Piece} from '../../types/piece';
import {UserService} from '../../services/user/user.service';
import {Circle, circle, latLng, Layer, Marker, marker, tileLayer} from 'leaflet';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {SeededRandomGeneratorService} from '../../services/seeded-random-generator/seeded-random-generator.service';
import {CoordinatesCalculusService} from '../../services/coordinates-calculus/coordinates-calculus.service';

@Component({
    selector: 'app-piece-dialog',
    templateUrl: './piece-dialog.component.html',
    styleUrls: ['./piece-dialog.component.css']
})
export class PieceDialogComponent implements OnInit {
    private readonly baseLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});
    private readonly zoom = 16;
    private readonly defaultRadius = 50;


    options: any;
    baseLayers: Layer[];
    markerLayer: Marker;
    circleLayer$: Observable<Circle>;

    showMarker$: Observable<boolean>;
    circleRadius$: Observable<number>;

    constructor(private readonly dialogRef: MatDialogRef<PieceDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly piece: Piece,
                private readonly userService: UserService,
                private readonly randomGenerator: SeededRandomGeneratorService,
                private readonly coordinatesCalculus: CoordinatesCalculusService) {
    }

    ngOnInit() {
        if (!this.piece) {
          console.warn('A piece is needed.');
          return;
        }

        const location = this.piece.location;
        const randomNumber = this.randomGenerator.generate(this.piece.objectID, true);
        const circleLocations = {
            latitude: this.coordinatesCalculus.addMetersToLatitude(location, randomNumber * 0.035355),
            longitude: this.coordinatesCalculus.addMetersToLongitude(location, randomNumber * 0.035355)
        };

        this.options = this.createLeafletOptions();
        this.baseLayers = [this.baseLayer];

        this.markerLayer = marker([location.latitude, location.longitude]);

        this.showMarker$ = this._shouldShowMarker();
        this.circleRadius$ = this._getCircleRadius();
        this.circleLayer$ = this._getCircleLayer(circleLocations);


        this.showMarker$.subscribe(v => console.log('showMarker$', v));
        this.circleRadius$.subscribe(v => console.log('showMarker$', v));
        this.showMarker$.subscribe(v => console.log('showMarker$', v));

    }

    private _shouldShowMarker() {
        return this.userService.user()
            .pipe(
                map(u => u && u.settings.locationApproximation === 0),
            );
    }

    private _getCircleLayer(location: { latitude: number; longitude: number; }): Observable<Circle> {
        return this.circleRadius$
            .pipe(
                startWith(this.defaultRadius),
                map(r => this._getCircleLocationsAndRadius(location, r)),
                map(locr => circle([locr.location.latitude, locr.location.longitude], {radius: locr.radius}))
            );
    }

    private _getCircleLocationsAndRadius(location: { latitude: number; longitude: number; }, radius: number): { location: { latitude: number; longitude: number }; radius: number } {
        const randomNumber = this.randomGenerator.generate(this.piece.objectID, true);
        const delta = (radius / 2) * Math.sqrt(2) * 0.001;
        const circleLocations = {
            latitude: this.coordinatesCalculus.addMetersToLatitude(location, randomNumber * delta),
            longitude: this.coordinatesCalculus.addMetersToLongitude(location, randomNumber * delta)
        };

        return {
            location: circleLocations,
            radius
        };
    }

    private _getCircleRadius() {
        return this.userService.user()
            .pipe(
                filter(u => !!u),
                map(u => u.settings.locationApproximation)
            );
    }

    private createLeafletOptions(): any {
        const l = this.piece.location;

        return {
            zoom: this.zoom,
            center: latLng(l.latitude, l.longitude),
        };
    }
}

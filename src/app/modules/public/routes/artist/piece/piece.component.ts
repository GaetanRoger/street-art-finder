import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Piece} from '../../../../core/types/piece';
import {UserService} from '../../../../core/services/user/user.service';
import {Circle, circle, latLng, Layer, Marker, marker, tileLayer} from 'leaflet';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
    private readonly baseLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'});
    private readonly zoom = 16;
    private readonly defaultRadius = 50;


    options: any;
    baseLayers: Layer[];
    markerLayer: Marker;
    circleLayer$: Observable<Circle>;

    showMarker$: Observable<boolean>;
    circleRadius$: Observable<number>;

    constructor(private readonly dialogRef: MatDialogRef<PieceComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly piece: Piece,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        const l = this.piece.location;

        this.options = this.createLeafletOptions();
        this.baseLayers = [this.baseLayer];

        this.markerLayer = marker([l.latitude, l.longitude]);

        this.showMarker$ = this.userService.isLoggedIn()
            .pipe(
                startWith(false),
            );
        this.circleRadius$ = this.userService.user()
            .pipe(
                filter(u => !!u),
                map(u => u.locationApproximation)
            );
        this.circleLayer$ = this.circleRadius$
            .pipe(
                startWith(this.defaultRadius),
                map(r => circle([l.latitude, l.longitude], {radius: r}))
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

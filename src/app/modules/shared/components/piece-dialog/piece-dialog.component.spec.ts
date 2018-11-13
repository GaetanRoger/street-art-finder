import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PieceDialogComponent} from './piece-dialog.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {TimestampPipe} from '../../pipes/timestamp/timestamp.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Input} from '@angular/core';
import {UserService} from '../../../core/services/users/user/user.service';
import {of} from 'rxjs';
import {MapHelperService} from '../../../core/services/map-helper/map-helper.service';
import {DatePipe} from '@angular/common';
import {mockPiece} from './test-mocks/mock-piece';
import {mockAdminUser, mockStandardUser} from './test-mocks/mock-users';
import {User} from '../../types/user';

@Component({
    selector: 'streart-map',
    template: ''
})
class MapComponent {
    @Input() elements: any;
    @Input() layerToShow: any;
    @Input() zoom: any;
}

describe('PieceDialogComponent', () => {
    let component: PieceDialogComponent;
    let fixture: ComponentFixture<PieceDialogComponent>;
    let userService: Partial<UserService>;
    let mapHelper: Partial<MapHelperService>;
    let element: HTMLElement;

    beforeEach(async(() => {
        userService = {
            user: () => of(mockStandardUser)
        };
        mapHelper = {
            randomizeCircleLocation: (loc, seed, radius) => loc
        };

        TestBed.configureTestingModule({
            declarations: [
                PieceDialogComponent,
                MapComponent,
                TimestampPipe
            ],
            imports: [
                ComponentsLibraryModule,
                RouterTestingModule.withRoutes([
                    {path: 'admin/add-piece/:id', component: PieceDialogComponent}
                ])
            ],
            providers: [
                TimestampPipe,
                DatePipe,
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: {piece: mockPiece}},
                {provide: UserService, useValue: userService},
                {provide: MapHelperService, useValue: mapHelper}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PieceDialogComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should retrieve piece from injected params', () => {
        fixture.detectChanges();
        expect(component.piece.objectID).toBe(mockPiece.objectID);
    });

    it('should detect whether to use marker or circle based on user\'s settings by default, here marker', (done: DoneFn) => {
        fixture.detectChanges();
        component.showMarker$.subscribe(v => {
            expect(v).toBeTruthy();
            done();
        });
    });

    it('should detect whether to use marker or circle based on user\'s settings by default, here circle', (done: DoneFn) => {
        const userWithCircle: User = {
            ...mockStandardUser,
            settings: {
                locationApproximation: 12
            }
        };

        const injectedUserService = fixture.debugElement.injector.get(UserService);
        injectedUserService.user = () => of(userWithCircle);
        fixture.detectChanges();

        component.showMarker$.subscribe(v => {
            expect(v).toBeFalsy();
            done();
        });
    });

    it('should use markers if alwaysUseMarker is set to true', () => {
        const injectedData = fixture.debugElement.injector.get(MAT_DIALOG_DATA);
        injectedData.alwaysUseMarker = true;
        fixture.detectChanges();

        expect(component.alwaysUseMarker).toBeTruthy();
    });

    it('should create a single pieceMapInput based on the given piece', (done: DoneFn) => {
        fixture.detectChanges();

        component.pieceMapInput$.subscribe(p => {
            expect(p.length).toBe(1);
            expect(p[0].id).toBe(mockPiece.objectID);

            expect(p[0].marker.getLatLng().lat).toBe(mockPiece.location.latitude);
            expect(p[0].marker.getLatLng().lng).toBe(mockPiece.location.longitude);

            expect(p[0].circle.getLatLng().lat).toBe(mockPiece.location.latitude);
            expect(p[0].circle.getLatLng().lng).toBe(mockPiece.location.longitude);

            // 10 is Leaflet's default value if 0 is provided as radius
            // See: https://leafletjs.com/reference-1.3.4.html#circlemarker-radius
            expect(p[0].circle.getRadius()).toBe(10);

            done();
        });
    });

    it('should should create a single pieceMapInput based on the given piece and use user\'s settings for radius', (done: DoneFn) => {
        const userWithCircle: User = {
            ...mockStandardUser,
            settings: {
                locationApproximation: 13
            }
        };

        const injectedUserService = fixture.debugElement.injector.get(UserService);
        injectedUserService.user = () => of(userWithCircle);
        fixture.detectChanges();

        // Repeat code for the sake of unit test clarity
        // tslint:disable:no-identical-function
        // noinspection TsLint
        component.pieceMapInput$.subscribe(p => {
            expect(p.length).toBe(1);
            expect(p[0].id).toBe(mockPiece.objectID);

            expect(p[0].marker.getLatLng().lat).toBe(mockPiece.location.latitude);
            expect(p[0].marker.getLatLng().lng).toBe(mockPiece.location.longitude);

            expect(p[0].circle.getLatLng().lat).toBe(mockPiece.location.latitude);
            expect(p[0].circle.getLatLng().lng).toBe(mockPiece.location.longitude);
            expect(p[0].circle.getRadius()).toBe(13);

            done();
        });
    });

    it('should not show admin button if user is not admin', (done: DoneFn) => {
        fixture.detectChanges();

        component.showAdminButton$.subscribe(v => {
            expect(v).toBeFalsy();
            const adminButton = element.querySelector<HTMLButtonElement>('button.edit-piece-button');
            expect(adminButton).toBeNull();
            done();
        });
    });

    it('should show admin button if user is admin', (done: DoneFn) => {
        const injectedUserService = fixture.debugElement.injector.get(UserService);
        injectedUserService.user = () => of(mockAdminUser);
        fixture.detectChanges();

        component.showAdminButton$.subscribe(v => {
            expect(v).toBeTruthy();
            const adminButton = element.querySelector<HTMLButtonElement>('button.edit-piece-button');
            expect(adminButton).not.toBeNull();

            done();
        });
    });

    it('should generate itinerary url', () => {
        fixture.detectChanges();

        const pieceLoc = mockPiece.location;
        const itineraryButton = element.querySelector<HTMLAnchorElement>('a.itinerary-button');

        expect(itineraryButton).not.toBeNull();
        expect(itineraryButton.href).toBe(`${component.baseMapsUrl}${pieceLoc.latitude},${pieceLoc.longitude}`);
        expect(itineraryButton.target).toBe('_blank');
    });
});

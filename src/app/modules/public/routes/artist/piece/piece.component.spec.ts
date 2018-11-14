import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PieceComponent} from './piece.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';
import {Component, Input} from '@angular/core';
import {Piece} from '../../../../shared/types/piece';
import SpyObj = jasmine.SpyObj;

const mockPieceWithoutDistance: Piece = {
    objectID: 'pieceid',
    name: 'Piece name',
    text: 'Piece text',
    location: {
        latitude: 12,
        longitude: 13
    },
    images: {
        main: {
            low: '',
            normal: ''
        },
        others: []
    },
    addedOn: 0,
    artist: {
        objectID: 'artistid',
        name: 'Artist name test',
        images: {
            horizontal: {
                low: '',
                normal: ''
            }
        }
    },
    tags: {
        vanished: true,
        accessible: true
    }
};

@Component({
    selector: 'streart-image',
    template: ''
})
class MockImageComponent {
    @Input() src: any;
}

describe('PieceComponent', () => {
    let component: PieceComponent;
    let fixture: ComponentFixture<PieceComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        const mockMatDialog: SpyObj<MatDialog> = jasmine.createSpyObj(MatDialog.name, ['open']);
        mockMatDialog.open.and.returnValue({} as MatDialogRef);

        TestBed.configureTestingModule({
            declarations: [PieceComponent, MockImageComponent],
            imports: [ComponentsLibraryModule],
            providers: [
                {provide: MatDialog, useValue: mockMatDialog}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PieceComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create', () => {
        component.piece = mockPieceWithoutDistance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should display piece name', () => {
        component.piece = mockPieceWithoutDistance;
        fixture.detectChanges();

        const pName = element.querySelector<HTMLParagraphElement>('.name p');

        expect(pName.innerText).toBe(mockPieceWithoutDistance.name);
    });

    it('should display distance if provided', () => {
        component.piece = {...mockPieceWithoutDistance, distance: 10000};
        fixture.detectChanges();

        const spanDistance = element.querySelector<HTMLSpanElement>('.distance');

        expect(spanDistance.innerText).toContain('10.0 km');
    });

    it('should not display distance if not provided', () => {
        component.piece = mockPieceWithoutDistance;
        fixture.detectChanges();

        const spanDistance = element.querySelector<HTMLSpanElement>('.distance');

        expect(spanDistance).toBeNull();
    });

    it('should open piece dialog when clicked', () => {
        const injectedMatDialog = fixture.debugElement.injector.get(MatDialog);
        component.piece = mockPieceWithoutDistance;
        fixture.detectChanges();

        element.querySelector<HTMLDivElement>('div.piece').click();
        fixture.detectChanges();

        expect(injectedMatDialog.open).toHaveBeenCalled();
    });
});

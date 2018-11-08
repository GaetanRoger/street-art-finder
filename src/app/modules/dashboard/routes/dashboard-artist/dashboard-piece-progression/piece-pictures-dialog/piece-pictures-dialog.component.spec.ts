import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PiecePicturesDialogComponent} from './piece-pictures-dialog.component';

describe('PiecePicturesDialogComponent', () => {
    let component: PiecePicturesDialogComponent;
    let fixture: ComponentFixture<PiecePicturesDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PiecePicturesDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PiecePicturesDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

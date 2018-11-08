import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddPieceComponent} from './admin-add-piece.component';

describe('AdminAddPieceComponent', () => {
    let component: AdminAddPieceComponent;
    let fixture: ComponentFixture<AdminAddPieceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminAddPieceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminAddPieceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

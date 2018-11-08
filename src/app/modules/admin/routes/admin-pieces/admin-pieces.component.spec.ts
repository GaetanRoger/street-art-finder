import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPiecesComponent} from './admin-pieces.component';

describe('AdminPiecesComponent', () => {
    let component: AdminPiecesComponent;
    let fixture: ComponentFixture<AdminPiecesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminPiecesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminPiecesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPieceProgressionComponent} from './dashboard-piece-progression.component';

describe('DashboardPieceProgressionComponent', () => {
    let component: DashboardPieceProgressionComponent;
    let fixture: ComponentFixture<DashboardPieceProgressionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPieceProgressionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPieceProgressionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

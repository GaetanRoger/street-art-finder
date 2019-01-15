import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDashboardComponent} from './admin-dashboard.component';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';

describe('AdminDashboardComponent', () => {
    let component: AdminDashboardComponent;
    let fixture: ComponentFixture<AdminDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminDashboardComponent, AdminToolbarComponent, ToolbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

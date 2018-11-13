import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminUsersComponent} from './admin-users.component';
import {SharedModule} from '../../../shared/shared.module';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';

describe('AdminUsersComponent', () => {
    let component: AdminUsersComponent;
    let fixture: ComponentFixture<AdminUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminUsersComponent, AdminToolbarComponent],
            imports: [SharedModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

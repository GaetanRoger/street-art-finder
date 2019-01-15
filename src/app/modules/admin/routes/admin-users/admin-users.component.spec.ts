import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminUsersComponent} from './admin-users.component';
import {SharedModule} from '../../../shared/shared.module';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('AdminUsersComponent', () => {
    let component: AdminUsersComponent;
    let fixture: ComponentFixture<AdminUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, ComponentsLibraryModule],
          declarations: [AdminUsersComponent, AdminToolbarComponent]
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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [
        DashboardComponent,
        ToolbarComponent,
        NotificationsComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardAllMapFiltersDialogComponent} from './dashboard-all-map-filters-dialog.component';
import {ComponentsLibraryModule} from '../../../../../components-library/components-library.module';
import {FormsModule} from '@angular/forms';

describe('DashboardAllMapFiltersDialogComponent', () => {
  let component: DashboardAllMapFiltersDialogComponent;
  let fixture: ComponentFixture<DashboardAllMapFiltersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule, FormsModule],
      declarations: [DashboardAllMapFiltersDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAllMapFiltersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

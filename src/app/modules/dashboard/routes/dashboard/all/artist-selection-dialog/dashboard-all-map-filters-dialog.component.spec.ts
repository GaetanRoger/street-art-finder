import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllMapFiltersDialogComponent } from './dashboard-all-map-filters-dialog.component';

describe('DashboardAllMapFiltersDialogComponent', () => {
  let component: DashboardAllMapFiltersDialogComponent;
  let fixture: ComponentFixture<DashboardAllMapFiltersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAllMapFiltersDialogComponent ]
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateGpsLocationDialogComponent } from './activate-gps-location-dialog.component';

describe('ActivateGpsLocationDialogComponent', () => {
  let component: ActivateGpsLocationDialogComponent;
  let fixture: ComponentFixture<ActivateGpsLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateGpsLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateGpsLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

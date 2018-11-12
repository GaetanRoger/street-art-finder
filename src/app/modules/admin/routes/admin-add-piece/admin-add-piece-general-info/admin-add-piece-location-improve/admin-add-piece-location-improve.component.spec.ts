import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPieceLocationImproveComponent } from './admin-add-piece-location-improve.component';

describe('AdminAddPieceLocationImproveComponent', () => {
  let component: AdminAddPieceLocationImproveComponent;
  let fixture: ComponentFixture<AdminAddPieceLocationImproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPieceLocationImproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPieceLocationImproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

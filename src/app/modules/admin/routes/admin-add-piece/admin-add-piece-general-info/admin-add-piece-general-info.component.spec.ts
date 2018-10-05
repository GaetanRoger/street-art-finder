import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPieceGeneralInfoComponent } from './admin-add-piece-general-info.component';

describe('AdminAddPieceGeneralInfoComponent', () => {
  let component: AdminAddPieceGeneralInfoComponent;
  let fixture: ComponentFixture<AdminAddPieceGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPieceGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPieceGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

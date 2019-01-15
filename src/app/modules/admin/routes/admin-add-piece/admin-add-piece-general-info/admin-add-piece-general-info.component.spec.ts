import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddPieceGeneralInfoComponent} from './admin-add-piece-general-info.component';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';
import {AdminAddPieceLocationImproveComponent} from './admin-add-piece-location-improve/admin-add-piece-location-improve.component';

describe('AdminAddPieceGeneralInfoComponent', () => {
  let component: AdminAddPieceGeneralInfoComponent;
  let fixture: ComponentFixture<AdminAddPieceGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [AdminAddPieceGeneralInfoComponent, AdminAddPieceLocationImproveComponent]
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

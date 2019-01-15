import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddPieceFinishComponent} from './admin-add-piece-finish.component';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';

describe('AdminAddPieceFinishComponent', () => {
  let component: AdminAddPieceFinishComponent;
  let fixture: ComponentFixture<AdminAddPieceFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [AdminAddPieceFinishComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPieceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

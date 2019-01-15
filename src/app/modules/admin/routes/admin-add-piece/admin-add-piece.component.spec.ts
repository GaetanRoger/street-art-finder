import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddPieceComponent} from './admin-add-piece.component';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {ReactiveFormsModule} from '@angular/forms';

describe('AdminAddPieceComponent', () => {
  let component: AdminAddPieceComponent;
  let fixture: ComponentFixture<AdminAddPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule, ReactiveFormsModule],
      declarations: [AdminAddPieceComponent, AdminToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

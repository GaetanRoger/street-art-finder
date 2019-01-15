import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminPiecesComponent} from './admin-pieces.component';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';
import {SelectableListComponent} from '../../components/selectable-list/selectable-list.component';

describe('AdminPiecesComponent', () => {
  let component: AdminPiecesComponent;
  let fixture: ComponentFixture<AdminPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPiecesComponent, AdminToolbarComponent, SelectableListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

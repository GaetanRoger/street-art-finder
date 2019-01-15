import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminArtistsComponent} from './admin-artists.component';
import {AdminToolbarComponent} from '../../components/admin-toolbar/admin-toolbar.component';
import {SelectableListComponent} from '../../components/selectable-list/selectable-list.component';

describe('AdminArtistsComponent', () => {
  let component: AdminArtistsComponent;
  let fixture: ComponentFixture<AdminArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminArtistsComponent, AdminToolbarComponent, SelectableListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

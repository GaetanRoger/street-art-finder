import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardArtistComponent} from './dashboard-artist.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('DashboardArtistComponent', () => {
  let component: DashboardArtistComponent;
  let fixture: ComponentFixture<DashboardArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [DashboardArtistComponent, ToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

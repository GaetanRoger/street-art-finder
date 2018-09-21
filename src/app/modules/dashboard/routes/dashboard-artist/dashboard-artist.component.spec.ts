import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArtistComponent } from './dashboard-artist.component';

describe('DashboardArtistComponent', () => {
  let component: DashboardArtistComponent;
  let fixture: ComponentFixture<DashboardArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardArtistComponent ]
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

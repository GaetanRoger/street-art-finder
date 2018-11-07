import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArtistsListComponent } from './home-artists-list.component';

describe('HomeArtistsListComponent', () => {
  let component: HomeArtistsListComponent;
  let fixture: ComponentFixture<HomeArtistsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeArtistsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeArtistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

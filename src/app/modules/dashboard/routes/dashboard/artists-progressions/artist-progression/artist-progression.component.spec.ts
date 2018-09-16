import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProgressionComponent } from './artist-progression.component';

describe('ArtistProgressionComponent', () => {
  let component: ArtistProgressionComponent;
  let fixture: ComponentFixture<ArtistProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistProgressionComponent} from './artist-progression.component';
import {ComponentsLibraryModule} from '../../../../../components-library/components-library.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ArtistProgressionComponent', () => {
  let component: ArtistProgressionComponent;
  let fixture: ComponentFixture<ArtistProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule, RouterTestingModule],
      declarations: [ArtistProgressionComponent]
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

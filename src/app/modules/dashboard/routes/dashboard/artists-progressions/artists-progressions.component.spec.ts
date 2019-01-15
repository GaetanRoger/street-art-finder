import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistsProgressionsComponent} from './artists-progressions.component';
import {HelpBubbleComponent} from '../../../../shared/components/help-bubble/help-bubble.component';
import {ArtistProgressionComponent} from './artist-progression/artist-progression.component';

describe('ArtistsProgressionsComponent', () => {
  let component: ArtistsProgressionsComponent;
  let fixture: ComponentFixture<ArtistsProgressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsProgressionsComponent, HelpBubbleComponent, ArtistProgressionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsProgressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBubbleComponent } from './help-bubble.component';

describe('HelpBubbleComponent', () => {
  let component: HelpBubbleComponent;
  let fixture: ComponentFixture<HelpBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

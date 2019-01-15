import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsComponent} from './settings.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {HelpBubbleComponent} from '../../../shared/components/help-bubble/help-bubble.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [
        SettingsComponent,
        ToolbarComponent,
        HelpBubbleComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

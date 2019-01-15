import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationsDialogComponent} from './notifications-dialog.component';
import {HelpBubbleComponent} from '../../../../../shared/components/help-bubble/help-bubble.component';
import {ComponentsLibraryModule} from '../../../../../components-library/components-library.module';

describe('NotificationsDialogComponent', () => {
  let component: NotificationsDialogComponent;
  let fixture: ComponentFixture<NotificationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [NotificationsDialogComponent, HelpBubbleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

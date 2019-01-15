import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UseDiscoverTabComponent} from './use-discover-tab.component';
import {FullScreenMessageComponent} from '../../../../../shared/components/full-screen-message/full-screen-message.component';
import {ComponentsLibraryModule} from '../../../../../components-library/components-library.module';

describe('UseDiscoverTabComponent', () => {
  let component: UseDiscoverTabComponent;
  let fixture: ComponentFixture<UseDiscoverTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [UseDiscoverTabComponent, FullScreenMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseDiscoverTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

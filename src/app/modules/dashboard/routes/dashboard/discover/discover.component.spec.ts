import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiscoverComponent} from './discover.component';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';
import {SmallHorizontalLoaderComponent} from '../../../../shared/components/small-horizontal-loader/small-horizontal-loader.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [DiscoverComponent, SmallHorizontalLoaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

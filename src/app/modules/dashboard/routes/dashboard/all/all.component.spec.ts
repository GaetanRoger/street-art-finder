import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllComponent} from './all.component';
import {MapComponent} from '../../../../shared/components/map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LeafletModule],
      declarations: [AllComponent, MapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPieceProgressionComponent} from './dashboard-piece-progression.component';
import {ImageComponent} from '../../../../shared/components/image/image.component';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';

describe('DashboardPieceProgressionComponent', () => {
  let component: DashboardPieceProgressionComponent;
  let fixture: ComponentFixture<DashboardPieceProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [DashboardPieceProgressionComponent, ImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPieceProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

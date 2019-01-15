import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminToolbarComponent} from './admin-toolbar.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('AdminToolbarComponent', () => {
  let component: AdminToolbarComponent;
  let fixture: ComponentFixture<AdminToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [AdminToolbarComponent, ToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

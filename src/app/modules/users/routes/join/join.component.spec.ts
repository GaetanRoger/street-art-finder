import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinComponent} from './join.component';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {LoginFormComponent} from '../../shared/login-form/login-form.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [JoinComponent, ToolbarComponent, LoginFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

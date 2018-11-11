import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataExplanationComponent } from './my-data-explanation.component';

describe('MyDataExplanationComponent', () => {
  let component: MyDataExplanationComponent;
  let fixture: ComponentFixture<MyDataExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDataExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDataExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCounterComponent } from './start-counter.component';

describe('StartCounterComponent', () => {
  let component: StartCounterComponent;
  let fixture: ComponentFixture<StartCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

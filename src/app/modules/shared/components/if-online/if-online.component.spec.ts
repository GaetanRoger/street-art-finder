import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfOnlineComponent } from './if-online.component';

describe('IfOnlineComponent', () => {
  let component: IfOnlineComponent;
  let fixture: ComponentFixture<IfOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

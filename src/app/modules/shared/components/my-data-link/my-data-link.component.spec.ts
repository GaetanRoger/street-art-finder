import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataLinkComponent } from './my-data-link.component';

describe('MyDataLinkComponent', () => {
  let component: MyDataLinkComponent;
  let fixture: ComponentFixture<MyDataLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDataLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDataLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

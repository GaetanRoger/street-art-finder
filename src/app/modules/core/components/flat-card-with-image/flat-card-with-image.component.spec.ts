import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatCardWithImageComponent } from './flat-card-with-image.component';

describe('FlatCardWithImageComponent', () => {
  let component: FlatCardWithImageComponent;
  let fixture: ComponentFixture<FlatCardWithImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatCardWithImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatCardWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

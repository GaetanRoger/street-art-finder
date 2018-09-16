import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseDiscoverTabComponent } from './use-discover-tab.component';

describe('UseDiscoverTabComponent', () => {
  let component: UseDiscoverTabComponent;
  let fixture: ComponentFixture<UseDiscoverTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseDiscoverTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseDiscoverTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanishedPiecesComponent } from './vanished-pieces.component';

describe('VanishedPiecesComponent', () => {
  let component: VanishedPiecesComponent;
  let fixture: ComponentFixture<VanishedPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanishedPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanishedPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

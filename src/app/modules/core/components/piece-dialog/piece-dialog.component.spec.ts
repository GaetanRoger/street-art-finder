import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceDialogComponent } from './piece-dialog.component';

describe('PieceDialogComponent', () => {
  let component: PieceDialogComponent;
  let fixture: ComponentFixture<PieceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

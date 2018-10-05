import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPieceImagesComponent } from './admin-add-piece-images.component';

describe('AdminAddPieceImagesComponent', () => {
  let component: AdminAddPieceImagesComponent;
  let fixture: ComponentFixture<AdminAddPieceImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddPieceImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPieceImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

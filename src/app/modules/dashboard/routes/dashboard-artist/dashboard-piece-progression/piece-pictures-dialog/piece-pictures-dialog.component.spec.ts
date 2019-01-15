import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PiecePicturesDialogComponent} from './piece-pictures-dialog.component';
import {ImageComponent} from '../../../../../shared/components/image/image.component';
import {ComponentsLibraryModule} from '../../../../../components-library/components-library.module';

describe('PiecePicturesDialogComponent', () => {
  let component: PiecePicturesDialogComponent;
  let fixture: ComponentFixture<PiecePicturesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsLibraryModule],
      declarations: [PiecePicturesDialogComponent, ImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecePicturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

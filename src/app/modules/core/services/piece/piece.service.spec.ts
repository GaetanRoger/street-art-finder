import { TestBed, inject } from '@angular/core/testing';

import { PieceService } from './piece.service';

describe('PieceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PieceService]
    });
  });

  it('should be created', inject([PieceService], (service: PieceService) => {
    expect(service).toBeTruthy();
  }));
});

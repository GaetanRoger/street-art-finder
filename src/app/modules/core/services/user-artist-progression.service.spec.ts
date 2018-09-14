import { TestBed, inject } from '@angular/core/testing';

import { UserArtistProgressionService } from './user-artist-progression.service';

describe('UserArtistProgressionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserArtistProgressionService]
    });
  });

  it('should be created', inject([UserArtistProgressionService], (service: UserArtistProgressionService) => {
    expect(service).toBeTruthy();
  }));
});

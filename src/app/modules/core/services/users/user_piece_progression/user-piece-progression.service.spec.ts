import {inject, TestBed} from '@angular/core/testing';

import {UserPieceProgressionService} from './user-piece-progression.service';

describe('UserPieceProgressionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserPieceProgressionService]
        });
    });

    it('should be created', inject([UserPieceProgressionService], (service: UserPieceProgressionService) => {
        expect(service).toBeTruthy();
    }));
});

import {TestBed} from '@angular/core/testing';

import {BrowserDetectorService} from './browser-detector.service';

describe('BrowserDetectorService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: BrowserDetectorService = TestBed.get(BrowserDetectorService);
        expect(service).toBeTruthy();
    });
});

import {async, inject, TestBed} from '@angular/core/testing';

import {ArtistService} from './artist.service';

describe('ArtistService', () => {
    function testEmemem(a) {
        expect(a).not.toBeUndefined();
        expect(a).not.toBeNull();
        expect(a.objectID).toEqual('hfdmsfdmdflmdf');
        expect(a.name).toEqual('Ememem');
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ArtistService]
        });
    });

    it('should be created', inject([ArtistService], (service: ArtistService) => {
        expect(service).toBeTruthy();
    }));

    it('should get an artist without its pieces', async(inject([ArtistService], (service: ArtistService) => {
        const artist$ = service.find('hfdmsfdmdflmdf');

        artist$.subscribe(a => {
            testEmemem(a);
            expect(a.pieces).toEqual([]);
        });
    })));


    it('should get an artist with its pieces', async(inject([ArtistService], (service: ArtistService) => {
        const artist$ = service.find('hfdmsfdmdflmdf', true);

        artist$.subscribe(a => {
            testEmemem(a);
            expect(a.pieces.length).toBeGreaterThan(0);
        });
    })));

});

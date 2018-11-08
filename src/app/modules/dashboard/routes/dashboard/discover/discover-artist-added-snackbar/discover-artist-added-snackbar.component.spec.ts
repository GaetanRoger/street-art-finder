import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiscoverArtistAddedSnackbarComponent} from './discover-artist-added-snackbar.component';

describe('DiscoverArtistAddedSnackbarComponent', () => {
    let component: DiscoverArtistAddedSnackbarComponent;
    let fixture: ComponentFixture<DiscoverArtistAddedSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiscoverArtistAddedSnackbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiscoverArtistAddedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

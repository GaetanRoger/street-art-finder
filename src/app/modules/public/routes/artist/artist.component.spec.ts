import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistComponent} from './artist.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('ArtistComponent', () => {
    let component: ArtistComponent;
    let fixture: ComponentFixture<ArtistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ComponentsLibraryModule],
            declarations: [ArtistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistPreviewComponent} from './artist-preview.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('ArtistPreviewComponent', () => {
    let component: ArtistPreviewComponent;
    let fixture: ComponentFixture<ArtistPreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArtistPreviewComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

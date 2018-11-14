import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeArtistsListComponent} from './home-artists-list.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoadingSpinnerComponent} from '../../../../shared/components/loading-spinner/loading-spinner.component';
import {ComponentsLibraryModule} from '../../../../components-library/components-library.module';

@Component({
    selector: 'streart-artist-preview',
    template: ''
})
class MockArtistPreviewComponent {
    @Input() artist: any;
}

@Component({
    selector: 'streart-load-more-button',
    template: ''
})
class MockLoadMoreButtonComponent {
    @Input() noMoreToLoad: any;
    @Input() loadMoreButtonColor: any;
    @Output() loadMore: EventEmitter<any> = new EventEmitter();
}

describe('HomeArtistsListComponent', () => {
    let component: HomeArtistsListComponent;
    let fixture: ComponentFixture<HomeArtistsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeArtistsListComponent,
                LoadingSpinnerComponent,
                MockArtistPreviewComponent,
                MockLoadMoreButtonComponent
            ],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeArtistsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

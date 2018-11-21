import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArtistComponent} from './artist.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {LoadingSpinnerComponent} from '../../../shared/components/loading-spinner/loading-spinner.component';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {of} from 'rxjs';
import {mockArtist} from '../../../../../mocks/data/mock-artist';
import {mockPiece} from '../../../../../mocks/data/mock-piece';
import {PieceService} from '../../../core/services/piece/piece.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'streart-toolbar',
    template: ''
})
class MockToolbarComponent {
    @Input() title: any;
    @Input() showSearchButton: any;
    @Input() showBackButton: any;
    @Input() image: any;
    @Output() searchChange: EventEmitter<string> = new EventEmitter();
}

@Component({
    selector: 'streart-flat-card-with-image',
    template: ''
})
class MockFlatCardWithImageComponent {
    @Input() title: any;
    @Input() text: any;
    @Input() image: any;
    @Input() secondaryButtonText: any;
    @Input() secondaryButtonExternalLink: any;
}

@Component({
    selector: 'streart-piece',
    template: ''
})
class MockPieceComponent {
    @Input() piece: any;
}

@Component({
    selector: 'streart-load-more-button',
    template: ''
})
class MockLoadMoreButtonComponent {
    @Input() noMoreToLoad: any;
    @Input() disabled: any;
    @Output() loadMore: EventEmitter<any> = new EventEmitter();
}

class MockPaginatorWithPieces {
    readonly contentChanges = of([mockPiece]);
    readonly noMoreToLoad = of(true);
    readonly loading = of(false);

    readonly setNearestFirst = () => this;
    readonly setQuery = () => this;
    readonly reset = () => this;
}

describe('ArtistComponent', () => {
    let component: ArtistComponent;
    let fixture: ComponentFixture<ArtistComponent>;

    const mockArtistServicesMethods = ['find'];
    const mockArtistService: SpyObj<ArtistService> = jasmine.createSpyObj(ArtistService.name, mockArtistServicesMethods);
    mockArtistService.find.and.returnValue(of(mockArtist));

    const mockPieceServicesMethods = ['paginator'];
    const mockPieceService: SpyObj<PieceService> = jasmine.createSpyObj(PieceService.name, mockPieceServicesMethods);
    mockPieceService.paginator.and.returnValue(new MockPaginatorWithPieces());

    const mockActivatedRoute = {
        snapshot: {
            params: {
                id: mockArtist.objectID
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ArtistComponent,
                LoadingSpinnerComponent,
                MockToolbarComponent,
                MockFlatCardWithImageComponent,
                MockPieceComponent,
                MockLoadMoreButtonComponent
            ],
            imports: [
                ComponentsLibraryModule,
                RouterTestingModule
            ],
            providers: [
                {provide: ArtistService, useValue: mockArtistService},
                {provide: PieceService, useValue: mockPieceService},
                {provide: ActivatedRoute, useValue: mockActivatedRoute}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});

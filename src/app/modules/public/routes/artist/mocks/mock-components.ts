import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'streart-toolbar',
    template: ''
})
export class MockToolbarComponent {
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
export class MockFlatCardWithImageComponent {
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
export class MockPieceComponent {
    @Input() piece: any;
}

@Component({
    selector: 'streart-load-more-button',
    template: ''
})
export class MockLoadMoreButtonComponent {
    @Input() noMoreToLoad: any;
    @Input() disabled: any;
    @Output() loadMore: EventEmitter<any> = new EventEmitter();
}

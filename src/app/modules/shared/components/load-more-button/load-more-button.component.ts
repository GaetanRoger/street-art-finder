import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'streat-load-more-button',
    templateUrl: './load-more-button.component.html',
    styleUrls: ['./load-more-button.component.css']
})
export class LoadMoreButtonComponent {
    readonly DEFAULT_TEXT = 'Load more';
    readonly DEFAULT_NO_MORE_TEXT = 'No more to load';
    readonly DEFAULT_LOAD_MORE_BUTTON_COLOR = 'primary';

    @Input() text = this.DEFAULT_TEXT;
    @Input() noMoreText = this.DEFAULT_NO_MORE_TEXT;
    @Input() noMoreToLoad = false;
    @Input() disabled = false;
    @Input() loadMoreButtonColor = this.DEFAULT_LOAD_MORE_BUTTON_COLOR;

    @Output() loadMore: EventEmitter<void> = new EventEmitter();
}

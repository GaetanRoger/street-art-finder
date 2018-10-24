import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-load-more-button',
    templateUrl: './load-more-button.component.html',
    styleUrls: ['./load-more-button.component.css']
})
export class LoadMoreButtonComponent {
    @Input() text = 'Load more';
    @Input() noMoreText = 'No more to load';
    @Input() noMoreToLoad = false;

    @Output() loadMore: EventEmitter<void> = new EventEmitter();
}

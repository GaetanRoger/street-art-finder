import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'streat-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent {
    @Input() src: string;
    @Input() alt: string;
    @Input() round = false;
    @Input() imgWidth: number;
    @Input() imgHeight: number;
    @Input() cover = true;
    @Input() fit = false;

    @Output() error: EventEmitter<Event> = new EventEmitter();

    showImage = false;
}

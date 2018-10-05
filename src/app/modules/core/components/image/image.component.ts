import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-image',
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
    @Input() fit: boolean;

    showImage = false;
}

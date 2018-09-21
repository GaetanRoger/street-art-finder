import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() src: string;
    @Input() alt: string;
    @Input() round = false;
    @Input() imgWidth: number;
    @Input() imgHeight: number;

    showImage = false;

    constructor() {
    }

    ngOnInit() {
        console.log(this.imgWidth, this.imgHeight);
    }

}

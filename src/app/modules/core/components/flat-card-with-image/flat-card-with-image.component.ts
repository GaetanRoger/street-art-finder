import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-flat-card-with-image',
    templateUrl: './flat-card-with-image.component.html',
    styleUrls: ['./flat-card-with-image.component.scss']
})
export class FlatCardWithImageComponent implements OnInit {
    @Input() title: string;
    @Input() text: string;
    @Input() image: string;
    @Input() primaryButtonText: string;
    @Input() secondaryButtonText: string;
    @Input() primaryButtonLink: string;
    @Input() secondaryButtonLink: string;

    backgroundImageProperty: string;


    constructor() {
    }

    ngOnInit() {
        this.backgroundImageProperty = 'background: url("'
            + this.image + '");';
    }

}

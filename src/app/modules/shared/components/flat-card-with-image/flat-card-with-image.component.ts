import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'streart-flat-card-with-image',
    templateUrl: './flat-card-with-image.component.html',
    styleUrls: ['./flat-card-with-image.component.scss']
})
export class FlatCardWithImageComponent implements OnChanges {
    @Input() title: string;
    @Input() titleClass = '';
    @Input() text: string;
    @Input() image: string;
    @Input() primaryButtonText: string;
    @Input() secondaryButtonText: string;
    @Input() primaryButtonRouterLink: string;
    @Input() secondaryButtonRouterLink: string;
    @Input() primaryButtonExternalLink: string;
    @Input() secondaryButtonExternalLink: string;

    backgroundImageProperty: SafeValue;


    constructor(private readonly sanitizer: DomSanitizer) {
    }

    ngOnChanges() {
        if (!this.image) {
            return;
        }

        this.backgroundImageProperty = this.sanitizer.bypassSecurityTrustStyle(
            `background-image: url("${this.image}");`
        );
    }

}

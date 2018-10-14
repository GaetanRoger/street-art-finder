import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrowserInfo} from '../../../../../core/services/browser-detector/browser-info';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-activate-gps-location-dialog',
    templateUrl: './activate-gps-location-dialog.component.html',
    styleUrls: ['./activate-gps-location-dialog.component.css']
})
export class ActivateGpsLocationDialogComponent implements OnInit {
    private readonly BASE_IMAGE_URL = '/assets/images/browser-gps-location-activation/';

    image: SafeUrl;
    showImage = true;

    constructor(private readonly dialogRef: MatDialogRef<ActivateGpsLocationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly browser: BrowserInfo,
                private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        const imageUrl = `${this.BASE_IMAGE_URL}${this.browser.name.toLowerCase()}-${this.browser.type.toLowerCase()}.png`;
        this.image = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }

    imageDoesNotExist(event: Event): void {
        this.showImage = false;
    }
}

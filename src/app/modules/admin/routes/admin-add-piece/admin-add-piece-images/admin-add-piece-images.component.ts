import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CropperComponent} from 'angular-cropperjs';
import Cropper from 'cropperjs';

@Component({
    selector: 'app-admin-add-piece-images',
    templateUrl: './admin-add-piece-images.component.html',
    styleUrls: ['./admin-add-piece-images.component.css']
})
export class AdminAddPieceImagesComponent implements OnInit {
    @Output() mainImage: EventEmitter<Blob> = new EventEmitter();

    mainImageUrl$: BehaviorSubject<SafeUrl> = new BehaviorSubject(null);
    readonly croppersOptions: Cropper.Options & any = {
        aspectRatio: 4 / 1,
        zoomable: true,
        movable: true,
        dragMode: 'move'
    };

    @ViewChild('mainCropper') mainCropper: CropperComponent;

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

    mainImageUploaded(result: Blob) {
        const fileReader = new FileReader();
        fileReader.onloadend = e => this.mainImageUrl$.next(this.sanitizer.bypassSecurityTrustUrl(e.target.result));
        fileReader.readAsDataURL(result);
    }

    onNext() {
        this.mainCropper.cropper
            .getCroppedCanvas()
            .toBlob(blob => this.mainImage.emit(blob));
    }
}

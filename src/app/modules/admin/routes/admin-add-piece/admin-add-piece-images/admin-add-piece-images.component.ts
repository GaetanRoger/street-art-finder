import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CropperComponent} from 'angular-cropperjs';
import Cropper from 'cropperjs';

@Component({
    selector: 'streat-admin-add-piece-images',
    templateUrl: './admin-add-piece-images.component.html',
    styleUrls: ['./admin-add-piece-images.component.css']
})
export class AdminAddPieceImagesComponent implements OnInit {

    @Input() editing: boolean;
    @Output() mainImage: EventEmitter<{ blob: Blob; name: string }> = new EventEmitter();
    @Output() uploadImages: EventEmitter<boolean> = new EventEmitter();

    mainImageUrl$: BehaviorSubject<SafeUrl> = new BehaviorSubject(null);
    readonly croppersOptions: Cropper.Options & any = {
        aspectRatio: 4 / 2,
        zoomable: true,
        movable: true,
        dragMode: 'move'
    };
    private _editingAndKeepingSameImages = false;
    private name: string;

    @ViewChild('mainCropper') mainCropper: CropperComponent;

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    get editingAndKeepingSameImages(): boolean {
        return this._editingAndKeepingSameImages;
    }

    set editingAndKeepingSameImages(value: boolean) {
        this.uploadImages.emit(!value);
        this._editingAndKeepingSameImages = value;
    }

    ngOnInit() {
    }

    get disableButton(): boolean {
        return (!this.editing && !this.mainImageUrl$.value)
            || (this.editing && !this._editingAndKeepingSameImages && !this.mainImageUrl$.value);
    }

    mainImageUploaded(result: File) {
        this.name = result.name;

        const fileReader = new FileReader();
        fileReader.onload = (e: any) => this.mainImageUrl$.next(this.sanitizer.bypassSecurityTrustUrl(e.target.result));
        fileReader.readAsDataURL(result);
    }

    onNext() {
        if (!this.editing || (this.editing && !this._editingAndKeepingSameImages)) {
            this.mainCropper.cropper
                .getCroppedCanvas()
                .toBlob(blob => this.mainImage.emit({blob, name: this.name}));
        }
    }
}

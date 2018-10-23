import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Artist} from '../../../../core/types/artist';
import {Piece} from '../../../../core/types/piece';
import {AngularFireStorage} from '@angular/fire/storage';
import {IdGeneratorService} from '../../../../core/services/id-generator/id-generator.service';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PieceCreationState} from './piece-creation-state.enum';
import {AddressFromGeopointService} from '../../../../core/services/address-from-geopoint/address-from-geopoint.service';
import {ImageResizerService} from '../../../../core/services/image-resizer/image-resizer.service';

@Component({
    selector: 'app-admin-add-piece-finish',
    templateUrl: './admin-add-piece-finish.component.html',
    styleUrls: ['./admin-add-piece-finish.component.css']
})
export class AdminAddPieceFinishComponent implements OnInit {
    @Input() pieceFormGroup: FormGroup;
    @Input() mainImage: { blob: Blob; name: string };

    lowUploadedPercentage$: Observable<number | undefined>;
    normalUploadedPercentage$: Observable<number | undefined>;
    state$: BehaviorSubject<PieceCreationState> = new BehaviorSubject(PieceCreationState.None);


    constructor(private readonly storage: AngularFireStorage,
                private readonly idGenerator: IdGeneratorService,
                private readonly pieceService: PieceService,
                private readonly addressService: AddressFromGeopointService,
                private readonly resizer: ImageResizerService) {
    }

    ngOnInit() {
    }

    get uploading(): boolean {
        return this.state$.value === PieceCreationState.Uploading;
    }

    get creating(): boolean {
        return this.state$.value === PieceCreationState.Creating;
    }

    get done(): boolean {
        return this.state$.value === PieceCreationState.Done;
    }

    get errored(): boolean {
        return this.state$.value === PieceCreationState.Error;

    }

    get creationLaunched(): boolean {
        return this.state$.value !== PieceCreationState.None;
    }

    async createPiece(): Promise<void> {
        if (this.pieceFormGroup.invalid) {
            this.state$.next(PieceCreationState.Error);
            return;
        }

        this.state$.next(PieceCreationState.Uploading);

        const pieceData = this.pieceFormGroup.value.general;
        const artist: Artist = pieceData.artist;
        const id = this.idGenerator.generateId();

        const urls = await this._uploadImages(artist, id);

        this.state$.next(PieceCreationState.Creating);

        await this._createPiece(id, pieceData, artist, urls.low, urls.normal);

        this.state$.next(PieceCreationState.Done);
    }

    private async _createPiece(id, pieceData, artist: Artist, uploadedImageUrlLow: string, uploadedImageUrlNormal: string) {
        const piece: Piece = await this._getPieceFromForm(id, pieceData, artist, uploadedImageUrlLow, uploadedImageUrlNormal);
        await this.pieceService.create(piece);
    }

    private async _uploadMainImageLow(artist: Artist, pieceId: string): Promise<string> {
        const resized = await this.resizer.resize(this.mainImage.blob, this.mainImage.name);

        const upload = this.pieceService.uploadImage(
            resized,
            this.mainImage.name,
            artist.objectID,
            pieceId,
            'low'
        );

        this.lowUploadedPercentage$ = upload.percentageChanges();

        const uploadedImage = await upload;
        return await uploadedImage.ref.getDownloadURL();
    }

    private async _uploadMainImageNormal(artist: Artist, pieceId: string): Promise<string> {
        const upload = this.pieceService.uploadImage(
            this.mainImage.blob,
            this.mainImage.name,
            artist.objectID,
            pieceId,
            'normal'
        );

        this.normalUploadedPercentage$ = upload.percentageChanges();

        const uploadedImage = await upload;
        return await uploadedImage.ref.getDownloadURL();
    }

    private async _getPieceFromForm(id: string, pieceData, artist: Artist, uploadedImageUrlLow: string, uploadedImageUrlNormal: string): Promise<Piece> {
        return {
            objectID: id,
            name: pieceData.name,
            text: pieceData.text,
            artist: {
                objectID: artist.objectID,
                name: artist.name,
                images: artist.images
            },
            location: {
                longitude: pieceData.location.longitude,
                latitude: pieceData.location.latitude
            },
            address: await this.addressService.get(pieceData.location),
            images: {
                main: {
                    low: uploadedImageUrlLow,
                    normal: uploadedImageUrlNormal
                },
                others: []
            },
            tags: {
                vanished: pieceData.vanished,
                accessible: pieceData.accessible
            },
            addedOn: Date.now(),
        };
    }

    private async _uploadImages(artist: Artist, pieceId: string): Promise<{ low: string; normal: string; }> {
        const uploads = await this.pieceService.uploadImages(
            this.mainImage.blob,
            this.mainImage.name,
            artist.objectID,
            pieceId
        );

        this.normalUploadedPercentage$ = uploads.normal.percentageChanges();
        this.lowUploadedPercentage$ = uploads.low.percentageChanges();

        const uploadedLow = await uploads.low;
        const uploadedNormal = await uploads.normal;

        return {
            low: await uploadedLow.ref.getDownloadURL(),
            normal: await uploadedNormal.ref.getDownloadURL(),
        };
    }
}

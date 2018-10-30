import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Artist} from '../../../../shared/types/artist';
import {Piece} from '../../../../shared/types/piece';
import {AngularFireStorage} from '@angular/fire/storage';
import {IdGeneratorService} from '../../../../core/services/random/id-generator/id-generator.service';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PieceCreationState} from './piece-creation-state.enum';
import {AddressFromGeopointService} from '../../../../core/services/location/address-from-geopoint/address-from-geopoint.service';
import {ImageResizerService} from '../../../../core/services/image-resizer/image-resizer.service';

@Component({
    selector: 'streat-admin-add-piece-finish',
    templateUrl: './admin-add-piece-finish.component.html',
    styleUrls: ['./admin-add-piece-finish.component.css']
})
export class AdminAddPieceFinishComponent implements OnInit {
    @Input() uploadImages = true;
    @Input() editing: boolean;
    @Input() pieceFormGroup: FormGroup;
    @Input() mainImage: { blob: Blob; name: string };
    @Input() editingPieceId: string;

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

        const urls = this.uploadImages ?
            await this._uploadImages(artist, id)
            : {low: undefined, normal: undefined};

        this.state$.next(PieceCreationState.Creating);

        await this._createPiece(id, pieceData, artist, urls.low, urls.normal);

        this.state$.next(PieceCreationState.Done);
    }

    private async _createPiece(
        id: string,
        pieceData,
        artist: Artist,
        uploadedImageUrlLow: string,
        uploadedImageUrlNormal: string
    ) {
        const piece: Piece = await this._getPieceFromForm(id, pieceData, artist, uploadedImageUrlLow, uploadedImageUrlNormal);
        if (this.editing) {
            piece.objectID = this.editingPieceId;
            await this.pieceService.update(piece);
        } else {
            await this.pieceService.create(piece);
        }
    }

    private async _getPieceFromForm(
        id: string,
        pieceData,
        artist: Artist,
        lowImageUrl: string,
        normalImageUrl: string
    ): Promise<any> {
        let obj = {
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
            tags: {
                vanished: pieceData.vanished,
                accessible: pieceData.accessible
            },
            addedOn: Date.now(),
        };

        if (lowImageUrl && normalImageUrl) {
            obj['images'] = {
                main: {
                    low: lowImageUrl,
                    normal: normalImageUrl
                },
                others: []
            };
        }

        return obj;
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

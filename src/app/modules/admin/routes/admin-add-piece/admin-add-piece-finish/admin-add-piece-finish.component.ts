import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Artist} from '../../../../core/types/artist';
import {Piece} from '../../../../core/types/piece';
import {AngularFireStorage} from '@angular/fire/storage';
import {IdGeneratorService} from '../../../../core/services/id-generator/id-generator.service';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PieceCreationState} from './piece-creation-state.enum';
import {Address} from '../../../../core/types/address';
import {AddressFromGeopointService} from '../../../../core/services/address-from-geopoint/address-from-geopoint.service';

@Component({
    selector: 'app-admin-add-piece-finish',
    templateUrl: './admin-add-piece-finish.component.html',
    styleUrls: ['./admin-add-piece-finish.component.css']
})
export class AdminAddPieceFinishComponent implements OnInit {
    @Input() pieceFormGroup: FormGroup;
    @Input() mainImage: Blob;

    uploadedPercentage$: Observable<number | undefined>;
    state$: BehaviorSubject<PieceCreationState> = new BehaviorSubject(PieceCreationState.None);


    constructor(private readonly storage: AngularFireStorage,
                private readonly idGenerator: IdGeneratorService,
                private readonly pieceService: PieceService,
                private readonly addressService: AddressFromGeopointService) {
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

        const uploadedImageUrl = await this._uploadedMainImage(artist, id);

        this.state$.next(PieceCreationState.Creating);

        await this._createPiece(id, pieceData, artist, uploadedImageUrl);

        this.state$.next(PieceCreationState.Done);
    }

    private async _createPiece(id, pieceData, artist: Artist, uploadedImageUrl) {
        const piece: Piece = await this._getPieceFromForm(id, pieceData, artist, uploadedImageUrl);
        await this.pieceService.create(piece);
    }

    private async _uploadedMainImage(artist: Artist, id) {
        const path = `/artists/${artist.objectID}/pieces/${id}/low.jpg`;
        const imageUploadTask = this.storage.upload(path, this.mainImage);

        this.uploadedPercentage$ = imageUploadTask.percentageChanges();

        const uploadedImage = await imageUploadTask;
        return await uploadedImage.ref.getDownloadURL();
    }

    private async _getPieceFromForm(id: string, pieceData, artist: Artist, uploadedImageUrl): Promise<Piece> {
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
                    // todo Resize low image to be quicker to load
                    low: uploadedImageUrl,
                    normal: uploadedImageUrl
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
}

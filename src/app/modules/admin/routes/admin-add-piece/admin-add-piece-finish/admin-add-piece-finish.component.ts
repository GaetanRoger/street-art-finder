import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Artist} from '../../../../core/types/artist';
import {Piece} from '../../../../core/types/piece';
import {AngularFireStorage} from 'angularfire2/storage';
import {IdGeneratorService} from '../../../../core/services/id-generator/id-generator.service';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-add-piece-finish',
    templateUrl: './admin-add-piece-finish.component.html',
    styleUrls: ['./admin-add-piece-finish.component.css']
})
export class AdminAddPieceFinishComponent implements OnInit {
    @Input() pieceFormGroup: FormGroup;
    @Input() mainImage: Blob;

    uploadedPercentage$: Observable<number | undefined>;


    constructor(private readonly storage: AngularFireStorage,
                private readonly idGenerator: IdGeneratorService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
    }

    async createPiece(): Promise<void> {
        if (this.pieceFormGroup.invalid) {
            // todo do something
            console.log('form group invalid');
            return;
        }

        const pieceData = this.pieceFormGroup.value.general;
        const artist: Artist = pieceData.artist;
        const id = this.idGenerator.generateId();

        console.log('id created:', id);

        console.log('uploading...');
        const path = `/artists/${artist.objectID}/pieces/${id}/low.jpg`;
        const imageUploadTask = this.storage.upload(path, this.mainImage);
        this.uploadedPercentage$ = imageUploadTask.percentageChanges();
        const uploadedImage = await imageUploadTask;
        const uploadedImageUrl = await uploadedImage.ref.getDownloadURL();

        const piece: Piece = this._getPieceFromForm(id, pieceData, artist, uploadedImageUrl);
        console.log('creating...', piece);
        await this.pieceService.create(piece)
            .then(c => console.log('created piece', c))
            .catch(e => console.log('piece erreor', e));
    }

    private _getPieceFromForm(id: string, pieceData, artist: Artist, uploadedImageUrl): Piece {
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
            addedOn: new Date(),
        };
    }

}

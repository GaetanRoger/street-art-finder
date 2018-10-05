import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from 'angularfire2/storage';
import {Artist} from '../../../core/types/artist';
import {AngularFirestore} from 'angularfire2/firestore';
import {Piece} from '../../../core/types/piece';
import {PieceService} from '../../../core/services/piece/piece.service';

@Component({
    selector: 'app-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit {
    pieceFormGroup: FormGroup;
    mainImage: Blob;

    constructor(private readonly fb: FormBuilder,
                private readonly storage: AngularFireStorage,
                // private readonly firestore: AngularFirestore,
                private readonly pieceService: PieceService) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group({
            general: this.fb.group({
                name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
                text: this.fb.control('', [Validators.required, Validators.minLength(3)]),
                vanished: this.fb.control(false),
                artist: this.fb.control('', Validators.required),
                location: this.fb.group({
                    latitude: this.fb.control('', Validators.required),
                    longitude: this.fb.control('', Validators.required)
                })
            })
        });
    }

    async createPiece(): Promise<void> {
        if (this.pieceFormGroup.invalid) {
            // todo do something
            console.log('form group invalid');
            return;
        }

        const pieceData = this.pieceFormGroup.value.general;
        const artist: Artist = pieceData.artist;
        const id = "dfhgjhkk";//this.firestore.createId();

        console.log('id created:', id);

        console.log('uploading...');
        const path = `/artists/${artist.objectID}/pieces/${id}/low.jpg`;
        const uploadedImage = await this.storage.upload(path, this.mainImage);
        const uploadedImageUrl = await uploadedImage.ref.getDownloadURL();

        console.log('creating...');
        const piece: Piece = this._getPieceFromForm(pieceData, artist, uploadedImageUrl);
        await this.pieceService.create(piece)
            .then(c => console.log('created piece', c))
            .catch(e => console.log('piece erreor', e));
    }

    private _getPieceFromForm(pieceData, artist: Artist, uploadedImageUrl) {
        return {
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
            addedOn: {toDate: () => new Date()},
        };
    }
}

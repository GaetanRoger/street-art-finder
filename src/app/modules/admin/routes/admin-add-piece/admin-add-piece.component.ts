import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PieceGroup} from './piece-group';
import {ActivatedRoute} from '@angular/router';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../shared/types/piece';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {combineLatest, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';
import {Artist} from '../../../shared/types/artist';

@Component({
    selector: 'streat-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit {
    pieceFormGroup: FormGroup;
    mainImage: { blob: Blob; name: string };
    editing: boolean;
    uploadImages = true;
    editingPieceId: string;

    constructor(private readonly fb: FormBuilder,
                private readonly route: ActivatedRoute,
                private readonly pieceService: PieceService,
                private readonly artistService: ArtistService) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group(new PieceGroup());
        this.editingPieceId = this.route.snapshot.params.pieceId;

        if (this.editingPieceId) {
            this.editing = true;
            this.pieceFormGroup.disable();
            this.pieceService.find(this.editingPieceId)
                .pipe(flatMap(p => combineLatest(of(p), this.artistService.find(p.artist.objectID))))
                .subscribe(([p, a]) => this._populateForm(p, a));
        } else {
            this.editing = false;
        }
    }


    private _populateForm(p: Piece, a: Artist) {
        const general = this.pieceFormGroup.get('general') as FormGroup;
        general.get('name').setValue(p.name);
        general.get('text').setValue(p.text);
        general.get('vanished').setValue(p.tags.vanished);
        general.get('accessible').setValue(p.tags.accessible);
        general.get('location').get('latitude').setValue(p.location.latitude);
        general.get('location').get('longitude').setValue(p.location.longitude);
        general.get('artist').setValue(a);

        this.pieceFormGroup.enable();
    }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PieceGroup} from './piece-group';
import {ActivatedRoute} from '@angular/router';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../shared/types/piece';

@Component({
    selector: 'streat-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit {
    pieceFormGroup: FormGroup;
    mainImage: { blob: Blob; name: string };
    editing: boolean;

    constructor(private readonly fb: FormBuilder,
                private readonly route: ActivatedRoute,
                private readonly pieceService: PieceService) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group(new PieceGroup());
        const pieceId = this.route.snapshot.params.pieceId;

        if (pieceId) {
            this.editing = true;
            this.pieceFormGroup.disable();
            this.pieceService.find(pieceId)
                .subscribe(p => this._populateForm(p));
        } else {
            this.editing = false;
        }
    }


    private _populateForm(p: Piece) {
        const general = this.pieceFormGroup.get('general') as FormGroup;
        general.get('name').setValue(p.name);
        general.get('text').setValue(p.text);
        general.get('vanished').setValue(p.tags.vanished);
        general.get('accessible').setValue(p.tags.accessible);
        general.get('location').get('latitude').setValue(p.location.latitude);
        general.get('location').get('longitude').setValue(p.location.longitude);
        general.get('artist').setValue({objectID: p.artist.objectID, name: p.artist.name});

        this.pieceFormGroup.enable();
    }
}

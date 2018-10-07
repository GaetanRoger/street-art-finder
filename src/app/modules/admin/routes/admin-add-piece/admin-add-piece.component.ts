import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PieceGroup} from './piece-group';

@Component({
    selector: 'app-admin-add-piece',
    templateUrl: './admin-add-piece.component.html',
    styleUrls: ['./admin-add-piece.component.css']
})
export class AdminAddPieceComponent implements OnInit {
    pieceFormGroup: FormGroup;
    mainImage: Blob;

    constructor(private readonly fb: FormBuilder) {
    }

    get general(): FormGroup {
        return this.pieceFormGroup.get('general') as FormGroup;
    }

    ngOnInit(): void {
        this.pieceFormGroup = this.fb.group(new PieceGroup(this.fb));
    }


}

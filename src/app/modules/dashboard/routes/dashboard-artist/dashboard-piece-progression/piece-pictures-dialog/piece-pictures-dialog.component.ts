import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Piece} from '../../../../../shared/types/piece';

@Component({
    selector: 'streart-piece-pictures-dialog',
    templateUrl: './piece-pictures-dialog.component.html',
    styleUrls: ['./piece-pictures-dialog.component.css']
})
export class PiecePicturesDialogComponent implements OnInit {

    constructor(readonly dialogRef: MatDialogRef<PiecePicturesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly data: { piece: Piece }) {
    }

    ngOnInit() {
    }

}

import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../../../core/types/piece';
import {PieceDialogComponent} from '../../../../core/components/piece-dialog/piece-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
    @Input() piece: Piece;

    constructor(private readonly dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openPieceDialog(piece: Piece): void {
        this.dialog.open(PieceDialogComponent, {
            autoFocus: false,
            data: piece,
            maxWidth: '96vw',
            minWidth: '96vw'
        });
    }
}

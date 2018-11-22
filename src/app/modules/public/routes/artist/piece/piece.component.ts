import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../../../shared/types/piece';
import {PieceDialogComponent} from '../../../../shared/components/piece-dialog/piece-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'streart-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
    @Input() piece: Piece;
    @Input() color: string;

    constructor(private readonly dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openPieceDialog(piece: Piece): void {
        if (!piece) {
            return;
        }
        this.dialog.open(PieceDialogComponent, {
            autoFocus: false,
            data: {piece},
            maxWidth: '96vw',
            minWidth: '96vw'
        });
    }
}

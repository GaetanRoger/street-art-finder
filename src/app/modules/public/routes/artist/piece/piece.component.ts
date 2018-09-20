import {Component, Input, OnInit} from '@angular/core';
import {Piece} from '../../../../core/types/piece';
import {PieceDialogComponent} from '../piece-dialog/piece-dialog.component';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
    @Input() piece: Piece;

    image$: Observable<string>;

    constructor(private readonly dialog: MatDialog,
                private readonly storage: AngularFireStorage) {
    }

    ngOnInit() {
        this.image$ = this.storage
            .ref(this.piece.images.main.low)
            .getDownloadURL();
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

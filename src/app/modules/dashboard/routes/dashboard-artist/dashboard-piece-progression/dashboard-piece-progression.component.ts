import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserPieceProgression} from '../../../../core/types/user-piece-progression';
import {MatDialog} from '@angular/material';
import {PieceDialogComponent} from '../../../../core/components/piece-dialog/piece-dialog.component';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Piece} from '../../../../core/types/piece';
import {PiecePicturesDialogComponent} from './piece-pictures-dialog/piece-pictures-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-piece-progression',
    templateUrl: './dashboard-piece-progression.component.html',
    styleUrls: ['./dashboard-piece-progression.component.css']
})
export class DashboardPieceProgressionComponent {
    @Input() progression: UserPieceProgression;
    @Output() found: EventEmitter<boolean> = new EventEmitter();
    opened: boolean;

    constructor(private readonly dialog: MatDialog,
                private readonly pieceService: PieceService) {
    }

    showMapDialog() {
        this.pieceService
            .find(this.progression.piece.objectID)
            .pipe(filter(p => !!p.name))
            .subscribe(piece => this._openPieceDialog(piece));
    }

    showPicturesDialog() {
        this.pieceService
            .find(this.progression.piece.objectID)
            .subscribe(piece => this._openPicturesDialog(piece));
    }

    private _openPieceDialog(piece: Piece): void {
        this.dialog.open(PieceDialogComponent, {
            autoFocus: false,
            data: piece,
            maxWidth: '96vw',
            minWidth: '96vw'
        });
    }

    private _openPicturesDialog(piece: Piece): void {
        this.dialog.open(PiecePicturesDialogComponent, {
            autoFocus: false,
            data: {piece},
            maxWidth: '96vw',
            minWidth: '96vw',
            panelClass: 'no-padding-on-dialog'
        });
    }
}

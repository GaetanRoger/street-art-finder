import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserPieceProgression} from '../../../../shared/types/user-piece-progression';
import {MatDialog} from '@angular/material';
import {PieceDialogComponent} from '../../../../shared/components/piece-dialog/piece-dialog.component';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Piece} from '../../../../shared/types/piece';
import {PiecePicturesDialogComponent} from './piece-pictures-dialog/piece-pictures-dialog.component';
import {filter, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'streat-dashboard-piece-progression',
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
        // No need to unsubscribe: only take 1
        this.pieceService
            .find(this.progression.piece.objectID)
            .pipe(filter(p => !!p.name), take(1))
            .subscribe(piece => this._openPieceDialog(piece));
    }

    showPicturesDialog() {
        // No need to unsubscribe: only take 1
        this.pieceService
            .find(this.progression.piece.objectID)
            .pipe(take(1))
            .subscribe(piece => this._openPicturesDialog(piece));
    }

    private _openPieceDialog(piece: Piece): Observable<any | undefined> {
        const dialog = this.dialog.open(PieceDialogComponent, {
            autoFocus: false,
            data: {piece, alwaysUseMarker: this.progression.found},
            maxWidth: '96vw',
            minWidth: '96vw'
        });

        return dialog.afterClosed();
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

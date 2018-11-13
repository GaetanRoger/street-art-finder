import {Component, OnInit} from '@angular/core';
import {PieceService} from '../../../core/services/piece/piece.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Piece} from '../../../shared/types/piece';
import {delay, filter, flatMap, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'streart-admin-pieces',
    templateUrl: './admin-pieces.component.html',
    styleUrls: ['./admin-pieces.component.css']
})
export class AdminPiecesComponent implements OnInit {
    pieces$: Observable<Piece[]>;
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    working$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    selectedPieces: Piece[] = [];

    readonly mainText = p => p.name;
    readonly subText = p => p.tags.vanished ? 'Vanished' : 'Not vanished';

    constructor(private readonly piecesService: PieceService,
                private readonly snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.pieces$ = this.filter$
            .pipe(
                delay(0), // Fix for ExpressionChangedAfterItHasBeenCheckedError (don't ask why)
                tap(_ => this.working$.next(true)),
                flatMap(f => this.piecesService.findAllAndSubscribe(f)),
                filter(p => !!p),
                tap(_ => this.working$.next(false))
            );
    }


    async markAsVanished() {
        this.working$.next(true);

        const selectedPieces = this.selectedPieces;
        const selectedPiecesCount = selectedPieces.length;
        const vanishedSelectedPiecesCount = this.selectedPieces.filter(p => p.tags.vanished).length;

        // If all pieces are vanished, unvanish them ; else, vanish them all
        const vanishedValue = selectedPiecesCount !== vanishedSelectedPiecesCount;
        const vanishText = vanishedValue ? 'vanished' : 'not vanished';

        const markAsVanishedPromises = this.selectedPieces
            .filter(p => p.tags.vanished !== vanishedValue)
            .map(p => this.piecesService.markAsVanished(p.objectID, vanishedValue));

        await Promise.all(markAsVanishedPromises);
        this.filter$.next(this.filter$.value);

        this.snackbar.open(`Saved piece(s) marked as ${vanishText}!`, null, {duration: 3000});

        this.working$.next(false);
    }

    async deleteSelectedPieces() {
        this.working$.next(true);

        const deletion = this.selectedPieces.map(p => this.piecesService.delete(p.objectID));
        await Promise.all(deletion);

        this.working$.next(false);
    }
}

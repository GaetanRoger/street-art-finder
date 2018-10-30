import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmationDialogData} from './confirmation-dialog-data';
import {BehaviorSubject, interval, Observable, of} from 'rxjs';
import {delay, map, startWith, take} from 'rxjs/operators';

@Component({
    selector: 'streat-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
    mainButtonDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    countDown$: Observable<number>;

    constructor(private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationDialogData) {
    }

    ngOnInit(): void {
        this._reactivateConfirmButtonIn(this.data.submitActivationDelay);
        this._setCountDown(this.data.submitActivationDelay);
    }

    close(result: boolean): void {
        this.dialogRef.close(result);
    }

    private _setCountDown(ms: number = 0): void {
        const time = Math.floor(ms / 1000);
        this.countDown$ = interval(1000)
            .pipe(
                take(time),
                startWith(-1),
                map(i => time - 1 - i),
            );
    }

    private _reactivateConfirmButtonIn(ms: number = 0): void {
        of(null)
            .pipe(delay(ms))
            .subscribe(() => this.mainButtonDisabled$.next(false));
    }
}

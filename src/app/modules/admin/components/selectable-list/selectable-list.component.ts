import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ObjectIDable} from '../../../core/types/object-idable';
import {MatDialog, MatSelectionList} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import {filter, map} from 'rxjs/operators';
import {ConfirmationDialogData} from '../../../core/components/confirmation-dialog/confirmation-dialog-data';

@Component({
    selector: 'app-selectable-list',
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./selectable-list.component.css']
})
export class SelectableListComponent<T extends ObjectIDable> implements OnInit {
    @Input() working$: Observable<boolean>;
    @Input() elements$: Observable<T>;
    @Input() mainText: (T) => string;
    @Input() subText: (T) => string;

    @Input() primaryButton: string;
    @Input() primaryButtonConfirmText: string;
    @Input() primaryButtonConfirmDelayed: boolean;
    @Output() primaryButtonClick: EventEmitter<void> = new EventEmitter();

    @Input() secondaryButton: string;
    @Input() secondaryButtonConfirmText: string;
    @Input() secondaryButtonConfirmDelayed: boolean;

    @Output() secondaryButtonClick: EventEmitter<void> = new EventEmitter();
    @Output() selectionChanged: EventEmitter<T[]> = new EventEmitter();

    @ViewChild(MatSelectionList) list: MatSelectionList;

    enableButtons$: Observable<boolean>;

    constructor(private readonly dialog: MatDialog) {

    }

    get selectedElements(): T[] {
        return this.list.selectedOptions.selected.map(e => e.value);
    }

    ngOnInit() {
        const selectionChanged$ = this.list.selectedOptions.changed;

        selectionChanged$.subscribe(_ => this.selectionChanged.emit(this.selectedElements));
        this.enableButtons$ = selectionChanged$.pipe(map(() => this.selectedElements.length > 0));
    }

    primaryButtonClicked(): void {
        if (!this.primaryButtonConfirmText) {
            this.primaryButtonClick.emit();
        }

        const data = this._createDialogData(this.primaryButtonConfirmText, this.primaryButtonConfirmDelayed);
        this._openDialog(data).subscribe(() => this.primaryButtonClick.emit());
    }

    secondaryButtonClicked(): void {
        if (!this.secondaryButtonConfirmText) {
            this.secondaryButtonClick.emit();
        }

        const data = this._createDialogData(this.secondaryButtonConfirmText, this.secondaryButtonConfirmDelayed);
        this._openDialog(data).subscribe(() => this.secondaryButtonClick.emit());
    }

    private _openDialog(data: ConfirmationDialogData): Observable<any> {
        return this.dialog.open(ConfirmationDialogComponent, {
            data: data,
            autoFocus: false,
        })
            .afterClosed()
            .pipe(filter(v => v === true));
    }

    private _createDialogData(text: string, delayed: boolean): ConfirmationDialogData {
        return {
            title: 'Are you sure?',
            text: text,
            submitActivationDelay: delayed ? 2000 : 0
        };
    }
}

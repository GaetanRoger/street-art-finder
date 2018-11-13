import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ObjectIDable} from '../../../shared/types/object-idable';
import {MatDialog, MatSelectionList} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {filter, map} from 'rxjs/operators';
import {ConfirmationDialogData} from '../../../shared/components/confirmation-dialog/confirmation-dialog-data';

@Component({
    selector: 'streart-selectable-list',
    templateUrl: './selectable-list.component.html',
    styleUrls: ['./selectable-list.component.css']
})
export class SelectableListComponent<T extends ObjectIDable> implements OnInit, OnDestroy {
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

    private _selectionChangedSubscription: Subscription;

    constructor(private readonly dialog: MatDialog) {

    }

    get selectedElements(): T[] {
        return this.list.selectedOptions.selected.map(e => e.value);
    }

    ngOnInit() {
        const selectionChanged$ = this.list.selectedOptions.changed;

        this._selectionChangedSubscription = selectionChanged$.subscribe(() => this.selectionChanged.emit(this.selectedElements));
        this.enableButtons$ = selectionChanged$.pipe(map(() => this.selectedElements.length > 0));
    }

    ngOnDestroy(): void {
        this._selectionChangedSubscription.unsubscribe();
    }


    primaryButtonClicked(): void {
        if (!this.primaryButtonConfirmText) {
            this.primaryButtonClick.emit();
        }

        const data = this._createDialogData(this.primaryButtonConfirmText, this.primaryButtonConfirmDelayed);

        // No need to unsubscribe: fired only once when closed
        this._openDialog(data).subscribe(() => this.primaryButtonClick.emit());
    }

    secondaryButtonClicked(): void {
        if (!this.secondaryButtonConfirmText) {
            this.secondaryButtonClick.emit();
        }

        const data = this._createDialogData(this.secondaryButtonConfirmText, this.secondaryButtonConfirmDelayed);

        // No need to unsubscribe: fired only once when closed
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

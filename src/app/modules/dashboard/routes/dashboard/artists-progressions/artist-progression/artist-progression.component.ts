import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserArtistProgression} from '../../../../../shared/types/user-artist-progression';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {MatDialog, MatMenuTrigger} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'streart-artist-progression',
    templateUrl: './artist-progression.component.html',
    styleUrls: ['./artist-progression.component.scss']
})
export class ArtistProgressionComponent implements OnInit {
    @Input() progression: UserArtistProgression;
    @Output() removeProgression: EventEmitter<void> = new EventEmitter();
    @Output() markAllAsFound: EventEmitter<void> = new EventEmitter();

    removed = false;

    backgroundImage: SafeValue;
    @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

    constructor(private readonly sanitizer: DomSanitizer,
                private readonly dialog: MatDialog) {
    }

    ngOnInit() {
        this.backgroundImage = this._generateBackgroundImage();
    }

    private _generateBackgroundImage(): SafeValue {
        const linearGradient = 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255,255, 0.8))';
        const horizontal = this.progression.artist.images.horizontal;

        const image = horizontal.low
            ? `background-image: ${linearGradient}, url("${horizontal.low}");`
            : `background-image: ${linearGradient}, url("${horizontal.normal}");`;

        return this.sanitizer.bypassSecurityTrustStyle(image);
    }

    openMenu(event: Event) {
        event.preventDefault();
        this.contextMenu.openMenu();
    }

    askToRemoveArtist() {
        this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: {
                    title: `Remove artist ${this.progression.artist.name}?`,
                    text: 'All your progression will be lost!',
                    submitActivationDelay: 2000,
                    mainButtonColor: 'warn'
                }
            }
        ).afterClosed()
            .pipe(filter(result => result === true))
            // No need to unsubscribe; only fired once after closed
            .subscribe(_ => {
                this.removeProgression.emit();
                this.removed = true;
            });
    }

    askToMarkAllPiecesAsFound(): void {
        this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: {
                    title: `Are you sure?`,
                    text: `Mark all pieces of artist ${this.progression.artist.name} as found?`,
                    submitActivationDelay: 2000,
                }
            }
        ).afterClosed()
            .pipe(filter(result => result === true))
            // No need to unsubscribe; only fired once after closed
            .subscribe(_ => {
                this.markAllAsFound.emit();
            });
    }
}

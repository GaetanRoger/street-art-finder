import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/users/user/user.service';
import {User} from '../../../shared/types/user';
import {UserSettingsService} from '../../../core/services/users/user-settings/user-settings.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserGeolocationService} from '../../../core/services/location/geolocation/user-geolocation.service';
import {BrowserDetectorService} from '../../services/browser-detector/browser-detector.service';
import {ActivateGpsLocationDialogComponent} from './components/activate-gps-location-dialog/activate-gps-location-dialog.component';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'streart-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
    settingsFormGroup: FormGroup;
    user: User;
    saving = false;
    errorMessage: string;
    generatingUserData = false;
    private _userSubscription: Subscription;

    constructor(private readonly fb: FormBuilder,
                private readonly userService: UserService,
                private readonly userSettings: UserSettingsService,
                private readonly snackbar: MatSnackBar,
                public readonly geolocation: UserGeolocationService,
                private readonly browserDetector: BrowserDetectorService,
                private readonly dialog: MatDialog,
                private readonly router: Router) {
    }

    get approximateLocation(): FormControl {
        return this.settingsFormGroup.get('approximateLocation') as FormControl;
    }

    ngOnInit() {
        this._userSubscription = this.userService.user()
            .subscribe(u => {
                this.user = u;
                this.settingsFormGroup = this.createFormGroup(u);
            });
    }

    ngOnDestroy(): void {
        this._userSubscription.unsubscribe();
    }


    save(): void {
        this.saving = true;
        const settings = this.settingsFormGroup.value;
        const data = {
            locationApproximation: settings.approximateLocation && settings.locationApproximation
                ? settings.locationApproximation
                : 0
        };

        this.userSettings.updateUserSettings(this.user.objectID, data)
            .then(_ => {
                this.saving = false;
                this.snackbar.open('Settings saved!', null, {duration: 3000});
            })
            .catch(_ => this.errorMessage = 'Sorry, an error occurred :(');
    }

    howToAllowGpsLocation(event: Event) {
        event.preventDefault();
        event.cancelBubble = true;

        this.dialog.open(ActivateGpsLocationDialogComponent,
            {
                data: this.browserDetector.detect(),
                minWidth: '96vw'
            });
    }

    askForAccountDeletion() {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'You are about to delete all your data.',
                text: 'This action cannot be undone. Everything related to you will be deleted.',
                submitActivationDelay: 5000,
                mainButtonColor: 'warn'
            }
        }).afterClosed()
            .pipe(filter(v => v === true))
            // No need to unsubscribe; only fired once after closed
            .subscribe(() => this.userService.delete().then(() => {
                this.snackbar.open('Your account has been deleted.', null, {duration: 5000});
                this.router.navigate(['/']);
            }));
    }

    askToDownloadUserData() {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Download all your data?',
                text: 'You are able to download everything Streart associate your account with. '
                    + 'It will be extracted from our database so the format may be a little rough.',
                submitActivationDelay: 5000,
                mainButtonColor: 'warn'
            }
        }).afterClosed()
            .pipe(filter(v => v === true))
            // No need to unsubscribe; only fired once after closed
            .subscribe(() => {
                this.generatingUserData = true;
                this.userService.getAllUserData()
                    .subscribe(data => {
                        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'text/json;charset=utf-8'});
                        FileSaver.saveAs(blob, 'all-your-data.json');
                        this.generatingUserData = false;
                    });
            });
    }

    private createFormGroup(u: User): FormGroup {
        return this.fb.group({
            approximateLocation: this.fb.control(!!u.settings.locationApproximation),
            locationApproximation: this.createLocationApproximationControl(u)
        });
    }

    private createLocationApproximationControl(u: User) {
        return this.fb.control(
            u.settings.locationApproximation,
            [
                Validators.pattern(/[0-9]+/),
                Validators.min(0)
            ]
        );
    }
}

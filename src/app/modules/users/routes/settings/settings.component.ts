import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/users/user/user.service';
import {User} from '../../../shared/types/user';
import {UserSettingsService} from '../../../core/services/users/user-settings/user-settings.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserGeolocationService} from '../../../core/services/location/geolocation/user-geolocation.service';
import {BrowserDetectorService} from '../../../core/services/browser-detector/browser-detector.service';
import {ActivateGpsLocationDialogComponent} from './components/activate-gps-location-dialog/activate-gps-location-dialog.component';
import {ConfirmationDialogComponent} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'streat-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    settingsFormGroup: FormGroup;
    user: User;
    saving = false;
    errorMessage: string;

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
        this.userService.user()
            .subscribe(u => {
                this.user = u;
                this.settingsFormGroup = this.createFormGroup(u);
            });
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
            .subscribe(() => this.userService.delete().then(() => {
                this.snackbar.open('Your account has been deleted.', null, {duration: 5000});
                this.router.navigate(['/']);
            }));
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

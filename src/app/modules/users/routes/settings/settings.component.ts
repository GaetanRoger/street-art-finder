import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user/user.service';
import {User} from '../../../core/types/user';
import {UserSettingsService} from '../../../core/services/user-settings/user-settings.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserGeolocationService} from '../../../core/services/geolocation/user-geolocation.service';
import {BrowserDetectorService} from '../../../core/services/browser-detector/browser-detector.service';
import {ActivateGpsLocationDialogComponent} from './components/activate-gps-location-dialog/activate-gps-location-dialog.component';

@Component({
    selector: 'app-settings',
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
                private readonly dialog: MatDialog) {
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

        console.log('bro', this.browserDetector.detect());

        this.dialog.open(ActivateGpsLocationDialogComponent,
            {
                data: this.browserDetector.detect(),
                minWidth: '96vw'
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

import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserSettings} from '../../types/user';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    public readonly DEFAULT_SETTINGS: {
        locationApproximation: 50
    };

    constructor(private readonly firestore: AngularFirestore) {
    }

    updateUserSettings(userId: string, settings: UserSettings) {
        return this.firestore
            .doc(`users/${userId}`)
            .update({
                settings
            });
    }
}

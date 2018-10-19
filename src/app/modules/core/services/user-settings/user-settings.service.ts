import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserSettings} from '../../types/user';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    public readonly DEFAULT_SETTINGS: UserSettings = {
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

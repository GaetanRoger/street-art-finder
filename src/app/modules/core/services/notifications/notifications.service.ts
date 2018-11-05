import {Injectable} from '@angular/core';
import {FirestoreFinderService} from '../firestore/firestore-finder/firestore-finder.service';
import {Observable} from 'rxjs';
import {UserService} from '../users/user/user.service';
import {flatMap} from 'rxjs/operators';
import {User} from '../../../shared/types/user';
import {Notification} from '../../../shared/types/notification';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private readonly COLLECTION = 'notifications';

    constructor(private readonly finder: FirestoreFinderService,
                private readonly userService: UserService,
                private readonly firestore: AngularFirestore) {
    }

    findUnread(): Observable<Notification[]> {
        return this.userService.user()
            .pipe(flatMap(user => this._findUnreadOfUser(user)));
    }

    private _findUnreadOfUser(user: User): Observable<Notification[]> {
        return this.finder.findFrom<Notification>(this.COLLECTION)
            .where('user', '==', user.objectID)
            .where('read', '==', false)
            .orderBy('date', 'desc')
            .run();
    }

    markAsRead(notifications: Notification[]): Promise<void> {
        const batch = this.firestore.firestore.batch();

        notifications.forEach(notification => {
            const ref = this.firestore.collection(this.COLLECTION).doc(notification.objectID).ref;

            batch.update(ref, {read: true});
            notification.read = true;
        });

        return batch.commit();
    }
}

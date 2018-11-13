import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NotificationsDialogComponent} from './notifications-dialog/notifications-dialog.component';
import {Observable} from 'rxjs';
import {NotificationsService} from '../../../../core/services/notifications/notifications.service';
import {take} from 'rxjs/operators';
import {Notification} from '../../../../shared/types/notification';

@Component({
    selector: 'streart-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    unreadNotifications$: Observable<Notification[]>;

    constructor(private readonly dialog: MatDialog,
                private readonly notifications: NotificationsService) {
    }

    ngOnInit() {
        this.unreadNotifications$ = this.notifications.findUnread();
    }

    openNotificationsDialog() {
        this.unreadNotifications$
            .pipe(take(1))
            // No need to unsubscribe; only take 1
            .subscribe(notifs => {
                const dialog = this.dialog.open(NotificationsDialogComponent, {
                    data: {
                        notifications: notifs
                    },
                    maxWidth: '96vw',
                    minWidth: '96vw',
                    disableClose: true
                });

                dialog.afterClosed()
                // No need to unsubscribe; only fired once after closed
                    .subscribe(v => this._updateReadNotifications(v));
            });
    }

    private _updateReadNotifications(notifications: Notification[]) {
        this.notifications.markAsRead(notifications.filter(n => n.read));
    }
}

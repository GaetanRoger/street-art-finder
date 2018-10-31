import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Notification} from '../../../../../shared/types/notification';

@Component({
    selector: 'streat-notifications-dialog',
    templateUrl: './notifications-dialog.component.html',
    styleUrls: ['./notifications-dialog.component.css']
})
export class NotificationsDialogComponent implements OnInit {
    notifications: Notification[];
    showDateId: string;

    get unreadNotifications(): number {
        return this.notifications.filter(n => !n.read).length;
    }

    constructor(private readonly dialogRef: MatDialogRef<NotificationsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public readonly data: { notifications: Notification[] }) {
    }

    ngOnInit() {
        this.notifications = this.data.notifications;
    }

    markAsRead(notificationId: string): void {
        const notif = this.notifications.find(n => n.objectID === notificationId);
        notif.read = true;
    }


}

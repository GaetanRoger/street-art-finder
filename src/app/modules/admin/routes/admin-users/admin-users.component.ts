import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Observable} from 'rxjs';
import {User} from '../../../core/types/user';
import {filter, tap} from 'rxjs/operators';
import {MatDialog, MatSelectionList, MatSnackBar} from '@angular/material';
import {ConfirmationDialogComponent} from '../../../core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
    users$: Observable<User[]>;

    @ViewChild(MatSelectionList) list: MatSelectionList;

    constructor(private readonly userService: UserService,
                private readonly snackbar: MatSnackBar,
                private readonly dialog: MatDialog) {
    }

    get selectedEmails() {
        return this.list.selectedOptions.selected.map(e => e.value);
    }

    ngOnInit() {
        this.users$ = this.userService.findAll().pipe(tap(u => console.log(u)));
    }

    resetButtonClick() {
        const dialogConfig = {
            data: {
                title: 'Send password reset emails',
                text: 'Confirm sending these password reset emails?'
            }
        };

        this.dialog.open(ConfirmationDialogComponent, dialogConfig)
            .afterClosed()
            .pipe(
                filter(result => result === true)
            )
            .subscribe(_ => {
                this.sendPasswordResetEmails();
            });
    }

    private sendPasswordResetEmails() {
        const promises = this.selectedEmails.map(u => this.userService.sendResetEmailLink(u));
        Promise.all(promises)
            .then(_ => this.snackbar.open('Password reset emails sent.'))
            .catch(e => this.snackbar.open('Error: ' + e.toString()));
    }
}
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule,
    MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatMenuModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatMenuModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSnackBarModule,
    ],
    declarations: [],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressBarModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSnackBarModule,

    ]
})
export class ComponentsLibraryModule {
}

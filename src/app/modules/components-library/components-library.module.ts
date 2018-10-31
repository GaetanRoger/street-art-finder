import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatAutocompleteModule, MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, MatRippleModule, MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
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
        MatListModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatExpansionModule,
        MatSelectModule,
        MatRippleModule,
        MatBadgeModule
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
        MatListModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatExpansionModule,
        MatSelectModule,
        MatRippleModule,
        MatBadgeModule
    ]
})
export class ComponentsLibraryModule {
}

import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {RouterModule} from '@angular/router';
import {ArtistPreviewComponent} from './components/artist-preview/artist-preview.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {TimestampPipe} from './pipes/timestamp/timestamp.pipe';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {SmallLoadingSpinnerComponent} from './components/small-loading-spinner/small-loading-spinner.component';
import {ImageComponent} from './components/image/image.component';
import {PieceDialogComponent} from './components/piece-dialog/piece-dialog.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {AlgoliaService} from './services/algolia/algolia.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsLibraryModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
        AngularFireStorageModule,
        LeafletModule
    ],
    declarations: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent,
        LoadingSpinnerComponent,
        TimestampPipe,
        ConfirmationDialogComponent,
        SmallLoadingSpinnerComponent,
        ImageComponent,
        PieceDialogComponent
    ],
    exports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent,
        LoadingSpinnerComponent,
        TimestampPipe,
        SmallLoadingSpinnerComponent,
        ImageComponent,
    ],
    providers: [DatePipe],
    entryComponents: [ConfirmationDialogComponent, PieceDialogComponent]
})
export class CoreModule {
}

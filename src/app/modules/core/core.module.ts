import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {RouterModule} from '@angular/router';
import {ArtistPreviewComponent} from './components/artist-preview/artist-preview.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TimestampPipe} from './pipes/timestamp/timestamp.pipe';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {SmallLoadingSpinnerComponent} from './components/small-loading-spinner/small-loading-spinner.component';
import {ImageComponent} from './components/image/image.component';
import {PieceDialogComponent} from './components/piece-dialog/piece-dialog.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {AlgoliaService} from './services/algolia/algolia.service';
import { HelpBubbleComponent } from './components/help-bubble/help-bubble.component';
import {FormsModule} from '@angular/forms';
import { SmallHorizontalLoaderComponent } from './components/small-horizontal-loader/small-horizontal-loader.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
        PieceDialogComponent,
        HelpBubbleComponent,
        SmallHorizontalLoaderComponent
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
        HelpBubbleComponent,
        SmallHorizontalLoaderComponent
    ],
    providers: [DatePipe],
    entryComponents: [ConfirmationDialogComponent, PieceDialogComponent]
})
export class CoreModule {
}

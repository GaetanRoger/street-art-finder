import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {ArtistPreviewComponent} from './components/artist-preview/artist-preview.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {TimestampPipe} from './pipes/timestamp/timestamp.pipe';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {SmallLoadingSpinnerComponent} from './components/small-loading-spinner/small-loading-spinner.component';
import {ImageComponent} from './components/image/image.component';
import {PieceDialogComponent} from './components/piece-dialog/piece-dialog.component';
import {HelpBubbleComponent} from './components/help-bubble/help-bubble.component';
import {SmallHorizontalLoaderComponent} from './components/small-horizontal-loader/small-horizontal-loader.component';
import {FullScreenMessageComponent} from './components/full-screen-message/full-screen-message.component';
import {LoadMoreButtonComponent} from './components/load-more-button/load-more-button.component';
import {MapComponent} from './components/map/map.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {FormsModule} from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {RouterModule} from '@angular/router';
import {IfOnlineComponent} from './components/if-online/if-online.component';
import {MyDataLinkComponent} from './components/my-data-link/my-data-link.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsLibraryModule,
        RouterModule,
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
        SmallHorizontalLoaderComponent,
        FullScreenMessageComponent,
        LoadMoreButtonComponent,
        MapComponent,
        IfOnlineComponent,
        MyDataLinkComponent,
    ],
    exports: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent,
        LoadingSpinnerComponent,
        TimestampPipe,
        SmallLoadingSpinnerComponent,
        ImageComponent,
        HelpBubbleComponent,
        SmallHorizontalLoaderComponent,
        FullScreenMessageComponent,
        LoadMoreButtonComponent,
        MapComponent,
        IfOnlineComponent,
        MyDataLinkComponent
    ],
    providers: [DatePipe],
    entryComponents: [ConfirmationDialogComponent, PieceDialogComponent]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { ArtistPreviewComponent } from './components/artist-preview/artist-preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsLibraryModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence()
    ],
    declarations: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent,
        LoadingSpinnerComponent
    ],
    exports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent,
        LoadingSpinnerComponent
    ]
})
export class CoreModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { ArtistPreviewComponent } from './components/artist-preview/artist-preview.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsLibraryModule
    ],
    declarations: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent
    ],
    exports: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent,
        ToolbarComponent
    ]
})
export class CoreModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { ArtistPreviewComponent } from './components/artist-preview/artist-preview.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
    declarations: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent
    ],
    exports: [
        FlatCardWithImageComponent,
        ArtistPreviewComponent
    ]
})
export class CoreModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlatCardWithImageComponent} from './components/flat-card-with-image/flat-card-with-image.component';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
    declarations: [
        FlatCardWithImageComponent
    ],
    exports: [
        FlatCardWithImageComponent
    ]
})
export class CoreModule {
}

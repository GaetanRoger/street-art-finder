import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './routes/home/home.component';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {ArtistComponent} from './routes/artist/artist.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {PieceDialogComponent} from '../core/components/piece-dialog/piece-dialog.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { PieceComponent } from './routes/artist/piece/piece.component';
import {AlgoliaService} from '../core/services/algolia/algolia.service';

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'artist/:id',
        component: ArtistComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        ComponentsLibraryModule
    ],
    declarations: [
        HomeComponent,
        NotFoundComponent,
        ArtistComponent,
        PieceComponent
    ]
})
export class PublicModule {
}

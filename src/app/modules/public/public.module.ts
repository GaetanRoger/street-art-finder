import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './routes/home/home.component';
import {Route, RouterModule} from '@angular/router';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {ArtistComponent} from './routes/artist/artist.component';
import {PieceComponent} from './routes/artist/piece/piece.component';
import {LearnMoreComponent} from './routes/learn-more/learn-more.component';
import {TempComponent} from './routes/temp/temp.component';
import {SharedModule} from '../shared/shared.module';
import {HomeArtistsListComponent} from './routes/home/home-artists-list/home-artists-list.component';

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
        path: 'learn-more',
        component: LearnMoreComponent
    },
    {
        path: 'temp',
        component: TempComponent
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
        SharedModule,
    ],
    declarations: [
        HomeComponent,
        NotFoundComponent,
        ArtistComponent,
        PieceComponent,
        LearnMoreComponent,
        TempComponent,
        HomeArtistsListComponent
    ]
})
export class PublicModule {
}

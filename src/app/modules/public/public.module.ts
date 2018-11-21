import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './routes/home/home.component';
import {Route, RouterModule} from '@angular/router';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {ArtistComponent} from './routes/artist/artist.component';
import {PieceComponent} from './routes/artist/piece/piece.component';
import {LearnMoreComponent} from './routes/learn-more/learn-more.component';
import {SharedModule} from '../shared/shared.module';
import {HomeArtistsListComponent} from './routes/home/home-artists-list/home-artists-list.component';
import {MyDataExplanationComponent} from './routes/my-data-explanation/my-data-explanation.component';
import {icon, Icon, Marker} from 'leaflet';

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
        path: 'my-data',
        component: MyDataExplanationComponent
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
        HomeArtistsListComponent,
        MyDataExplanationComponent
    ]
})
export class PublicModule {
    // Override default Icons
    private _defaultIcon: Icon = icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconAnchor: [12, 40]
    });

    constructor() {
        Marker.prototype.options.icon = this._defaultIcon;
    }
}

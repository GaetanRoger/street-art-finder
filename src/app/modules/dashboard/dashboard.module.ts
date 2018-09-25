import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {ArtistProgressionComponent} from './routes/dashboard/artists-progressions/artist-progression/artist-progression.component';
import {AllComponent} from './routes/dashboard/all/all.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {DiscoverComponent} from './routes/dashboard/discover/discover.component';
import {ArtistsProgressionsComponent} from './routes/dashboard/artists-progressions/artists-progressions.component';
import {UseDiscoverTabComponent} from './routes/dashboard/artists-progressions/use-discover-tab/use-discover-tab.component';
import { DashboardArtistComponent } from './routes/dashboard-artist/dashboard-artist.component';
import { DashboardPieceProgressionComponent } from './routes/dashboard-artist/dashboard-piece-progression/dashboard-piece-progression.component';
import {PieceDialogComponent} from '../core/components/piece-dialog/piece-dialog.component';

const routes: Route[] = [
    {
        path: 'artist/:id',
        component: DashboardArtistComponent
    },
    {
        path: '',
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        CoreModule,
        ComponentsLibraryModule,
        LeafletModule
    ],
    declarations: [
        DashboardComponent,
        ArtistProgressionComponent,
        AllComponent,
        DiscoverComponent,
        ArtistsProgressionsComponent,
        UseDiscoverTabComponent,
        DashboardArtistComponent,
        DashboardPieceProgressionComponent
    ],
    providers: [],
    entryComponents: [PieceDialogComponent]
})
export class DashboardModule {
}

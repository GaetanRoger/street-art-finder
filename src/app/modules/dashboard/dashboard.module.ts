import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {ArtistProgressionComponent} from './routes/dashboard/artists-progressions/artist-progression/artist-progression.component';
import {AllComponent} from './routes/dashboard/all/all.component';
import {DiscoverComponent} from './routes/dashboard/discover/discover.component';
import {ArtistsProgressionsComponent} from './routes/dashboard/artists-progressions/artists-progressions.component';
import {UseDiscoverTabComponent} from './routes/dashboard/artists-progressions/use-discover-tab/use-discover-tab.component';
import {DashboardArtistComponent} from './routes/dashboard-artist/dashboard-artist.component';
import {DashboardPieceProgressionComponent} from './routes/dashboard-artist/dashboard-piece-progression/dashboard-piece-progression.component';
import {PieceDialogComponent} from '../shared/components/piece-dialog/piece-dialog.component';
import {PiecePicturesDialogComponent} from './routes/dashboard-artist/dashboard-piece-progression/piece-pictures-dialog/piece-pictures-dialog.component';
import {DiscoverArtistAddedSnackbarComponent} from './routes/dashboard/discover/discover-artist-added-snackbar/discover-artist-added-snackbar.component';
import {SharedModule} from '../shared/shared.module';
import {NotificationsComponent} from './routes/dashboard/notifications/notifications.component';
import {NotificationsDialogComponent} from './routes/dashboard/notifications/notifications-dialog/notifications-dialog.component';
import {NotificationComponent} from './routes/dashboard/notifications/notifications-dialog/notification/notification.component';
import {ComponentsLibraryModule} from '../components-library/components-library.module';

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
        SharedModule,
        ComponentsLibraryModule
    ],
    declarations: [
        DashboardComponent,
        ArtistProgressionComponent,
        AllComponent,
        DiscoverComponent,
        ArtistsProgressionsComponent,
        UseDiscoverTabComponent,
        DashboardArtistComponent,
        DashboardPieceProgressionComponent,
        PiecePicturesDialogComponent,
        DiscoverArtistAddedSnackbarComponent,
        NotificationsComponent,
        NotificationsDialogComponent,
        NotificationComponent
    ],
    entryComponents: [
        PieceDialogComponent,
        PiecePicturesDialogComponent,
        DiscoverArtistAddedSnackbarComponent,
        NotificationsDialogComponent
    ]
})
export class DashboardModule {
}

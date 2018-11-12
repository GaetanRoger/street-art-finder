import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './routes/admin-dashboard/admin-dashboard.component';
import {AdminUsersComponent} from './routes/admin-users/admin-users.component';
import {AdminToolbarComponent} from './components/admin-toolbar/admin-toolbar.component';
import {TimestampPipe} from '../shared/pipes/timestamp/timestamp.pipe';
import {AngularCropperjsModule} from 'angular-cropperjs';
import {AdminAddPieceComponent} from './routes/admin-add-piece/admin-add-piece.component';
import {AdminAddPieceGeneralInfoComponent} from './routes/admin-add-piece/admin-add-piece-general-info/admin-add-piece-general-info.component';
import {AdminAddPieceImagesComponent} from './routes/admin-add-piece/admin-add-piece-images/admin-add-piece-images.component';
import {AdminAddPieceFinishComponent} from './routes/admin-add-piece/admin-add-piece-finish/admin-add-piece-finish.component';
import {AdminPiecesComponent} from './routes/admin-pieces/admin-pieces.component';
import {AdminArtistsComponent} from './routes/admin-artists/admin-artists.component';
import {SelectableListComponent} from './components/selectable-list/selectable-list.component';
import {SharedModule} from '../shared/shared.module';
import { AdminAddPieceLocationImproveComponent } from './routes/admin-add-piece/admin-add-piece-general-info/admin-add-piece-location-improve/admin-add-piece-location-improve.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

const routes: Route[] = [
    {
        path: 'users',
        component: AdminUsersComponent,
    },
    {
        path: 'artists',
        component: AdminArtistsComponent
    },
    {
        path: 'pieces',
        component: AdminPiecesComponent
    },
    {
        path: 'add-piece',
        component: AdminAddPieceComponent
    },
    {
        path: 'add-piece/:pieceId',
        component: AdminAddPieceComponent
    },
    {
        path: '',
        component: AdminDashboardComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule,
        AngularCropperjsModule,
        LeafletModule
    ],
    declarations: [
        AdminDashboardComponent,
        AdminUsersComponent,
        AdminToolbarComponent,
        AdminAddPieceComponent,
        AdminAddPieceGeneralInfoComponent,
        AdminAddPieceImagesComponent,
        AdminAddPieceFinishComponent,
        AdminPiecesComponent,
        AdminArtistsComponent,
        SelectableListComponent,
        AdminAddPieceLocationImproveComponent,
    ],
    providers: [TimestampPipe]
})
export class AdminModule {
}

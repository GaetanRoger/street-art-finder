import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {AdminDashboardComponent} from './routes/admin-dashboard/admin-dashboard.component';
import {AdminUsersComponent} from './routes/admin-users/admin-users.component';
import {AdminToolbarComponent} from './components/admin-toolbar/admin-toolbar.component';
import {TimestampPipe} from '../core/pipes/timestamp/timestamp.pipe';
import {AngularCropperjsModule} from 'angular-cropperjs';
import { AdminAddPieceComponent } from './routes/admin-add-piece/admin-add-piece.component';
import { AdminAddPieceGeneralInfoComponent } from './routes/admin-add-piece/admin-add-piece-general-info/admin-add-piece-general-info.component';
import { AdminAddPieceImagesComponent } from './routes/admin-add-piece/admin-add-piece-images/admin-add-piece-images.component';

const routes: Route[] = [
    {
        path: 'users',
        component: AdminUsersComponent,
    },
    {
      path: 'add-piece',
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
        RouterModule.forChild(routes),
        CoreModule,
        ComponentsLibraryModule,
        AngularCropperjsModule
    ],
    declarations: [AdminDashboardComponent, AdminUsersComponent, AdminToolbarComponent, AdminAddPieceComponent, AdminAddPieceGeneralInfoComponent, AdminAddPieceImagesComponent],
    providers: [TimestampPipe]
})
export class AdminModule {
}

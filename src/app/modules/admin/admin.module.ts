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

const routes: Route[] = [
    {
        path: 'users',
        component: AdminUsersComponent,
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
    ],
    declarations: [AdminDashboardComponent, AdminUsersComponent, AdminToolbarComponent],
    providers: [TimestampPipe]
})
export class AdminModule {
}

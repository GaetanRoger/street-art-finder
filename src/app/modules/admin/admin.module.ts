import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import { AdminDashboardComponent } from './routes/admin-dashboard/admin-dashboard.component';

const routes: Route[] = [
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
    declarations: [AdminDashboardComponent]
})
export class AdminModule {
}

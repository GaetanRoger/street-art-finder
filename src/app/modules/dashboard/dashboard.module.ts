import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import {DashboardComponent} from './routes/dashboard/dashboard.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserService} from '../core/services/user/user.service';

const routes: Route[] = [
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
        AngularFireAuthModule
    ],
    declarations: [DashboardComponent],
    providers: [UserService]
})
export class DashboardModule {
}
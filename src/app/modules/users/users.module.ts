import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {JoinComponent} from './routes/join/join.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginFormComponent} from './shared/login-form/login-form.component';
import {LoginComponent} from './routes/login/login.component';
import {LogoutComponent} from './routes/logout/logout.component';
import {SettingsComponent} from './routes/settings/settings.component';
import {ActivateGpsLocationDialogComponent} from './routes/settings/components/activate-gps-location-dialog/activate-gps-location-dialog.component';
import {AuthGuard} from '../core/guards/auth/auth.guard';
import {SharedModule} from '../shared/shared.module';

const routes: Route[] = [
    {
        path: 'join',
        component: JoinComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        canActivate: [AuthGuard],
        component: LogoutComponent
    },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        component: SettingsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [JoinComponent, LoginFormComponent, LoginComponent, LogoutComponent, SettingsComponent, ActivateGpsLocationDialogComponent],
    providers: [],
    entryComponents: [ActivateGpsLocationDialogComponent]
})
export class UsersModule {
}

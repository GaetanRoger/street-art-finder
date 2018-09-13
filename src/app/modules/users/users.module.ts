import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {ComponentsLibraryModule} from '../components-library/components-library.module';
import { JoinComponent } from './routes/join/join.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginFormComponent } from './shared/login-form/login-form.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {UserService} from '../core/services/user/user.service';
import { LoginComponent } from './routes/login/login.component';
import { LogoutComponent } from './routes/logout/logout.component';

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
        component: LogoutComponent
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
    declarations: [JoinComponent, LoginFormComponent, LoginComponent, LogoutComponent],
    providers: [UserService]
})
export class UsersModule {
}

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

const routes: Route[] = [
    {
        path: 'join',
        component: JoinComponent
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
    declarations: [JoinComponent, LoginFormComponent],
    providers: [UserService]
})
export class UsersModule {
}

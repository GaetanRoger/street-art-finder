import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Route, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AuthGuard} from './modules/core/guards/auth.guard';
import {AngularFireAuthModule} from 'angularfire2/auth';

const routes: Route[] = [
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'users',
        loadChildren: 'src/app/modules/users/users.module#UsersModule'
    },
    {
        path: '',
        loadChildren: 'src/app/modules/public/public.module#PublicModule'
    },

];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

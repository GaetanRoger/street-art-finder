import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Route, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';

const routes: Route[] = [
    {
        path: 'users',
        loadChildren: 'src/app/modules/users/users.module#UsersModule'
    },
    {
        path: 'dashboard',
        loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule'
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
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

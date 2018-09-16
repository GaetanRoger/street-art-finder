import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Route, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AuthGuard} from './modules/core/guards/auth/auth.guard';
import {CoreModule} from './modules/core/core.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {Icon, icon, Marker} from 'leaflet';
import {OnlyAdminGuard} from './modules/core/guards/only-admin/only-admin.guard';

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
        path: 'admin',
        canActivate: [OnlyAdminGuard],
        loadChildren: 'src/app/modules/admin/admin.module#AdminModule'
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
        CoreModule,
        LeafletModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    // Override default Icons
    private defaultIcon: Icon = icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconAnchor: [12, 40]
    });

    constructor() {
        Marker.prototype.options.icon = this.defaultIcon;
        // firebase.firestore.setLogLevel('debug');
    }
}

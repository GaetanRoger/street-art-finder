import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PreloadAllModules, Route, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AuthGuard} from './modules/core/guards/auth/auth.guard';
import {CoreModule} from './modules/core/core.module';
import {OnlyAdminGuard} from './modules/core/guards/only-admin/only-admin.guard';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ExtraModuleInjectorService} from './modules/core/extra-module-injector.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material';
import {OnlineService} from './modules/core/services/online/online.service';
import {FunctionsRegionToken} from '@angular/fire/functions';

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
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'ignore',
    }),
    CoreModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {provide: FunctionsRegionToken, useValue: 'us-central1'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private _wasOnline = false;

  constructor(private readonly extraInjector: ExtraModuleInjectorService,
              private readonly snackbar: MatSnackBar,
              private readonly online: OnlineService) {
    this._setUpOnlineStatusPopups();
    // firebase.firestore.setLogLevel('debug');
  }

  private _setUpOnlineStatusPopups() {
    this.online
      .onlineChanges
      .subscribe(v => {
        if (v && this._wasOnline) {
          this.snackbar.open(
            '☀️ You are back online!',
            'YEH!',
            {duration: 2000}
          );
        } else if (!v) {
          this._wasOnline = true;
          this.snackbar.open(
            '☁️ You are offline; some features will be disabled.',
            'GOT IT',
            {duration: 5000}
          );
        }
      });
  }
}

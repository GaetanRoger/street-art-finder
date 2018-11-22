import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    Ng2ImgMaxModule,
    HttpClientModule
  ]
})
export class CoreModule {

}

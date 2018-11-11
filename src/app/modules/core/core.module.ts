import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {AngularFireFunctionsModule} from '@angular/fire/functions';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
        AngularFireStorageModule,
        AngularFireFunctionsModule,
        Ng2ImgMaxModule
    ],
    exports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
    ],
})
export class CoreModule {

}

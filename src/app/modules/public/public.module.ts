import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './routes/home/home.component';
import {Route, RouterModule} from '@angular/router';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {CoreModule} from '../core/core.module';
import { NotFoundComponent } from './routes/not-found/not-found.component';

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule
    ],
    declarations: [HomeComponent, NotFoundComponent]
})
export class PublicModule {
}

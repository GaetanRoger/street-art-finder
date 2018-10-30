import {Component, OnInit} from '@angular/core';
import {AggregatesService} from '../../../core/services/aggregates/aggregates.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Aggregates} from '../../../shared/types/aggregates';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import Cropper from 'cropperjs';

@Component({
    selector: 'streat-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    aggregates$: Observable<Aggregates>;

    constructor(private readonly aggregatesService: AggregatesService) {
    }

    ngOnInit() {
        this.aggregates$ = this.aggregatesService.getAll();
    }

}

import {Component, OnInit} from '@angular/core';
import {AggregatesService} from '../../../core/services/aggregates/aggregates.service';
import {Observable} from 'rxjs';
import {Aggregates} from '../../../core/types/aggregates';

@Component({
    selector: 'app-admin-dashboard',
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
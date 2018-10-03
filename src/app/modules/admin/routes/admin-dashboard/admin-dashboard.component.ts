import {Component, OnInit, ViewChild} from '@angular/core';
import {AggregatesService} from '../../../core/services/aggregates/aggregates.service';
import {Observable, of} from 'rxjs';
import {Aggregates} from '../../../core/types/aggregates';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    aggregates$: Observable<Aggregates>;
    path$: Observable<SafeUrl>;
    cropperOptions: {
        aspectRatio: 1.7777777,
        checkCrossOrigin: true
        movable: false
        scalable: false
        viewMode: 1
        zoomable: false
    };


    constructor(private readonly aggregatesService: AggregatesService,
                private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.aggregates$ = this.aggregatesService.getAll();
    }

    imageUrlChanged(path: Blob): void {
        const fileReader = new FileReader();
        fileReader.onloadend = e => this.path$ = of(this.sanitizer.bypassSecurityTrustUrl(e.target.result)).pipe(delay(500));
        fileReader.readAsDataURL(path);
    }

    onCropperReady() {
    }
}

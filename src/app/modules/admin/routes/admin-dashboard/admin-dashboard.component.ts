import {Component, OnInit} from '@angular/core';
import {AggregatesService} from '../../../core/services/aggregates/aggregates.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Aggregates} from '../../../core/types/aggregates';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import Cropper from 'cropperjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
    aggregates$: Observable<Aggregates>;
    path$: BehaviorSubject<SafeUrl> = new BehaviorSubject(null);
    cropperOptions: Cropper.Options = {
        aspectRatio: 4 / 1,
        zoomable: true,
    };

    constructor(private readonly aggregatesService: AggregatesService,
                private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.aggregates$ = this.aggregatesService.getAll();
    }

    imageUrlChanged(path: Blob): void {
        const fileReader = new FileReader();
        fileReader.onloadend = e => this.path$.next(this.sanitizer.bypassSecurityTrustUrl(e.target.result));
        fileReader.readAsDataURL(path);
    }
}

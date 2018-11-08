import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'streat-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
    @Input() text: string;

    constructor() {
    }

    ngOnInit() {
    }

}

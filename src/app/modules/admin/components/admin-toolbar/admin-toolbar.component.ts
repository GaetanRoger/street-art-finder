import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-admin-toolbar',
    templateUrl: './admin-toolbar.component.html',
    styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {
    @Input() title: string;

    constructor() {
    }

    ngOnInit() {
    }

}

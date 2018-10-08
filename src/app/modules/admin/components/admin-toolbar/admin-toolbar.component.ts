import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-admin-toolbar',
    templateUrl: './admin-toolbar.component.html',
    styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {
    @Input() title: string;
    @Input() showSearchButton = false;
    @Output() searchChange: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'streat-use-discover-tab',
    templateUrl: './use-discover-tab.component.html',
    styleUrls: ['./use-discover-tab.component.css']
})
export class UseDiscoverTabComponent implements OnInit {
    @Output() goToDiscover: EventEmitter<void> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    goToDiscoverTab(): void {
        this.goToDiscover.emit();
    }
}

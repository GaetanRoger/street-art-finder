import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'streart-full-screen-message',
    templateUrl: './full-screen-message.component.html',
    styleUrls: ['./full-screen-message.component.css']
})
export class FullScreenMessageComponent implements OnInit {
    @Input() icon: string;
    @Input() title: string;
    @Input() text: string;
    @Input() actionText: string;
    @Output() action: EventEmitter<void> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}

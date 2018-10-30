import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'streat-help-bubble',
    templateUrl: './help-bubble.component.html',
    styleUrls: ['./help-bubble.component.css']
})
export class HelpBubbleComponent implements OnInit {
    @Input() text: string;
    @Input() uid: string;
    @Input() closable = true;

    private readonly PREFIX = 'help.bubble.';

    clickedOnce = false;
    hide = false;

    constructor() {
    }

    ngOnInit() {
        if (localStorage.getItem(this.PREFIX + this.uid) === 'true') {
            this.hide = true;
        }
    }

    onClick() {
        if (!this.closable) {
            return;
        }

        if (!this.clickedOnce) {
            this.clickedOnce = true;
        } else {
            this.hide = true;
            localStorage.setItem(this.PREFIX + this.uid, 'true');
        }
    }
}

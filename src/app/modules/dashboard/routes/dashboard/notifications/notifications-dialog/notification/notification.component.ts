import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notification} from '../../../../../../shared/types/notification';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'streat-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
    animations: [
        trigger('swipe', [
            transition('* => slideOut',
                animate('{{duration}}',
                    keyframes(
                        [
                            style({transform: 'translate3d(0, 0, 0)', offset: 0}),
                            style({transform: 'translate3d({{dir}}150%, 0, 0)', opacity: 0, offset: 1}),
                        ]
                    )
                )
            ),
            state('slideOut', style({
                display: 'none'
            }))
        ])
    ]
})
export class NotificationComponent implements OnInit {
    @Input() notification: Notification;
    @Output() markAsRead: EventEmitter<void> = new EventEmitter();

    animation: string;
    animationParams: { duration: string; dir: string };
    showDateId: string;


    constructor() {
    }

    ngOnInit() {
    }

    onSwipe(e, dir: '' | '-') {
        this._animateSwipe(e, dir);
        this.markAsRead.emit();
    }

    private _animateSwipe(e, dir: '' | '-'): void {
        const duration = Math.max(200, Math.abs(e.distance / e.velocityX));

        this.animationParams = {
            duration: duration + 'ms',
            dir: dir
        };
        this.animation = 'slideOut';
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {UserPieceProgression} from '../../../../core/types/user-piece-progression';

@Component({
    selector: 'app-dashboard-piece-progression',
    templateUrl: './dashboard-piece-progression.component.html',
    styleUrls: ['./dashboard-piece-progression.component.css']
})
export class DashboardPieceProgressionComponent implements OnInit {
    @Input() progression: UserPieceProgression;

    constructor() {
    }

    ngOnInit() {
    }

}

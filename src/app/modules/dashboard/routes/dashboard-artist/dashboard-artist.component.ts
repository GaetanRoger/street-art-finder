import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserPieceProgressionService} from '../../../core/services/user_piece_progression/user-piece-progression.service';
import {UserService} from '../../../core/services/user/user.service';
import {UserPieceProgression} from '../../../core/types/user-piece-progression';

@Component({
    selector: 'app-dashboard-artist',
    templateUrl: './dashboard-artist.component.html',
    styleUrls: ['./dashboard-artist.component.css']
})
export class DashboardArtistComponent implements OnInit {
    private artistId$: Observable<string>;
    progressions$: Observable<UserPieceProgression[]>;

    constructor(private readonly route: ActivatedRoute,
                private readonly userPieceProgression: UserPieceProgressionService,
                private readonly userService: UserService) {
    }

    ngOnInit() {
        this.artistId$ = this._routeArtistId();
        this.progressions$ = this._getUserPiecesProgressions();

    }

    private _getUserPiecesProgressions() {
        return this.userPieceProgression
            .piecesProgression(
                this.userService.user(),
                {
                    notFoundFirst: true
                }
            );
    }

    private _routeArtistId() {
        return this.route.params.pipe(
            map(params => params.id)
        );
    }
}

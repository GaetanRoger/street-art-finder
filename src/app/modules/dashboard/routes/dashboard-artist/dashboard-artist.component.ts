import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserPieceProgressionService} from '../../../core/services/user_piece_progression/user-piece-progression.service';
import {UserService} from '../../../core/services/user/user.service';
import {UserPieceProgression} from '../../../core/types/user-piece-progression';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../core/types/piece';

@Component({
    selector: 'app-dashboard-artist',
    templateUrl: './dashboard-artist.component.html',
    styleUrls: ['./dashboard-artist.component.css']
})
export class DashboardArtistComponent implements OnInit {
    private artistId$: Observable<string>;
    progressions$: Observable<UserPieceProgression[]>;
    vanishedPieces$: Observable<Piece[]>;
    showVanishedPieces$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private readonly route: ActivatedRoute,
                private readonly userPieceProgression: UserPieceProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService) {
    }

    ngOnInit() {
        this.artistId$ = this._routeArtistId();
        this.progressions$ = this._getUserPiecesProgressions();
    }

    markAsFound(progressionid: string, value: boolean): void {
        this.userPieceProgression.toggleFound(progressionid, value);
    }

    seeVanishedPieces() {
        if (!this.vanishedPieces$) {
            this.vanishedPieces$ = this.artistId$.pipe(flatMap(id => this.pieceService.findAllVanished(id)));
        }

        this.showVanishedPieces$.next(true);
    }

    hideVanishedPieces() {
        this.showVanishedPieces$.next(false);
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

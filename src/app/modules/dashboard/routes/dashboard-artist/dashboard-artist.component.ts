import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserPieceProgressionService} from '../../../core/services/user_piece_progression/user-piece-progression.service';
import {UserService} from '../../../core/services/user/user.service';
import {UserPieceProgression} from '../../../core/types/user-piece-progression';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../core/types/piece';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Artist} from '../../../core/types/artist';

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
    artist$: Observable<Artist>;

    constructor(private readonly route: ActivatedRoute,
                private readonly userPieceProgression: UserPieceProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService,
                private readonly artistService: ArtistService) {
    }

    ngOnInit() {
        this.artistId$ = this._routeArtistId();
        this.artist$ = this._artistFromId();
        this.progressions$ = this._getUserPiecesProgressions();
    }

    private _artistFromId() {
        return this.artistId$.pipe(flatMap(id => this.artistService.find(id)));
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

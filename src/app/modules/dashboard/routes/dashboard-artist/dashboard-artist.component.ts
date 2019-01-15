import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {UserPieceProgressionService} from '../../../core/services/users/user_piece_progression/user-piece-progression.service';
import {UserService} from '../../../core/services/users/user/user.service';
import {UserPieceProgression} from '../../../shared/types/user-piece-progression';
import {PieceService} from '../../../core/services/piece/piece.service';
import {Piece} from '../../../shared/types/piece';
import {ArtistService} from '../../../core/services/artist/artist.service';
import {Artist} from '../../../shared/types/artist';
import {UserGeolocationService} from '../../../core/services/location/geolocation/user-geolocation.service';

@Component({
    selector: 'streart-dashboard-artist',
    templateUrl: './dashboard-artist.component.html',
    styleUrls: ['./dashboard-artist.component.css']
})
export class DashboardArtistComponent implements OnInit {
    private artistId$: Observable<string>;
    progressions$: Observable<UserPieceProgression[]>;
    vanishedPieces$: Observable<Piece[]>;
    showVanishedPieces$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    artist$: Observable<Artist>;

    hideFound: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private readonly route: ActivatedRoute,
                private readonly userPieceProgression: UserPieceProgressionService,
                private readonly userService: UserService,
                private readonly pieceService: PieceService,
                private readonly artistService: ArtistService,
                private readonly geolocation: UserGeolocationService) {
    }

    ngOnInit() {
        this._loadHideFoundValueFromLocalStorage();
        this.hideFound.subscribe(v => localStorage.setItem('toggle.hideFoundPieces', v ? 'true' : 'false'));
        this.artistId$ = this._routeArtistId();
        this.artist$ = this._artistFromId();
        this.progressions$ = this._getUserPiecesProgressions();
    }

    private _loadHideFoundValueFromLocalStorage() {
        const ls = localStorage.getItem('toggle.hideFoundPieces');
        if (ls && ls === 'true') {
            this.hideFound.next(true);
        }
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
        const upp$ = combineLatest(this.artistId$, this.hideFound)
            .pipe(
                flatMap(
                    ([artistId, hideFound]) => this.userPieceProgression
                        .piecesProgression(artistId, {
                            onlyNotFound: hideFound
                        }))
            );

        return combineLatest(upp$, this.geolocation.currentGeolocation())
            .pipe(
                map(
                    ([pp, g]) => pp.map(p => {
                      p.piece.distance = g
                            ? UserGeolocationService.distance(g, p.piece.location) as number
                            : null;
                        return p;
                    })
                ),
                map(
                    pp => [...pp].sort((p1, p2) => p1.piece.distance - p2.piece.distance)
                )
            );
    }

    private _routeArtistId() {
        return this.route.params.pipe(
            map(params => params.id)
        );
    }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserArtistProgressionService} from '../../../../core/services/users/user-artist-progression.service';
import {UserService} from '../../../../core/services/users/user/user.service';
import {filter, flatMap, map, take} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {PieceService} from '../../../../core/services/piece/piece.service';
import {Circle, Marker} from 'leaflet';
import {User} from '../../../../shared/types/user';
import {MapHelperService} from '../../../../core/services/map-helper/map-helper.service';
import {MapElementInput} from '../../../../shared/components/map/map-element-input';
import {CircleBuilder} from '../../../../core/services/map-helper/builders/circle-builder';
import {MarkerBuilder} from '../../../../core/services/map-helper/builders/marker-builder';
import {UserPieceProgressionService} from '../../../../core/services/users/user_piece_progression/user-piece-progression.service';
import {UserPieceProgression} from '../../../../shared/types/user-piece-progression';
import {LeafletButton} from '../../../../shared/components/map/leaflet-button';
import {MatDialog} from '@angular/material';
import {DashboardAllMapFiltersDialogComponent} from './artist-selection-dialog/dashboard-all-map-filters-dialog.component';
import {ArtistPreview} from '../../../../shared/types/artist';
import {DashboardAllMapFiltersDialogResponse} from './artist-selection-dialog/dashboard-all-map-filters-dialog-response';

@Component({
  selector: 'streart-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  @Input() selected$: BehaviorSubject<boolean>;

  pieces$: Observable<MapElementInput[]>;
  showMarkers$: Observable<boolean>;
  selectedArtist$: BehaviorSubject<string> = new BehaviorSubject(null);
  onlyNotFound$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectArtistButton: LeafletButton;

  private _user$: Observable<User>;

  constructor(private readonly progression: UserArtistProgressionService,
              private readonly userService: UserService,
              private readonly userPieceProgression: UserPieceProgressionService,
              private readonly pieceService: PieceService,
              private readonly mapHelper: MapHelperService,
              private readonly dialog: MatDialog,
              private readonly detector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._user$ = this.userService.user();
    this.showMarkers$ = this.mapHelper.shouldShowMarkers();
    this.pieces$ = this._getPieces();
    this.selectArtistButton = this._createArtistSelectionButton();
  }

  private _getPieces(): Observable<MapElementInput[]> {
    return this.userPieceProgression.findAll(this._user$.pipe(map(u => u.objectID)))
      .pipe(
        flatMap(pieces => combineLatest(of(pieces), this._user$, this.selectedArtist$, this.onlyNotFound$)),
        map(this._filterSelectedArtist),
        map(([ps, u]) => ps.map(p => ({
          id: p.piece.objectID,
          circle: this._createCircleFromPieceProgression(p, u.settings.locationApproximation),
          marker: this._createMarkerFromPieceProgression(p)
        })))
      );
  }

  private _createMarkerFromPieceProgression(p: UserPieceProgression): Marker {
    return new MarkerBuilder(p.piece.location)
      .setOptions({title: p.piece.name, alt: `${p.piece.name} marker`})
      .setPopupContent(`<strong>${p.piece.name}</strong>, by ${p.artist.name}`)
      .build();
  }

  private _createCircleFromPieceProgression(p: UserPieceProgression, radius: number): Circle {
    return new CircleBuilder(p.piece.location)
      .setRadius(radius)
      .setPopupContent(`<strong>${p.piece.name}</strong>, by ${p.artist.name}`)
      .build();
  }

  private _filterSelectedArtist(
    [pieces, user, selectedArtistId, onlyNotFound]: [UserPieceProgression[], User, string, boolean]
  ): [UserPieceProgression[], User] {
    if (!selectedArtistId) {
      return [pieces, user];
    }

    return [
      pieces.filter(p => p.artist.objectID === selectedArtistId)
        .filter(p => !onlyNotFound || !p.found),
      user
    ];
  }

  private _createArtistSelectionButton(): LeafletButton {
    return {
      icon: '<div style="font-size: 150%;display: flex;justify-content: center;align-items: center;">&rtriltri;</div>',
      title: 'Filter artist',
      onClick: this._selectArtist.bind(this)
    };

  }

  private _selectArtist(): void {
    this.detector.detectChanges();

    this.progression.findAll(this._user$)
      .pipe(
        take(1),
        map(p => p.map(pp => pp.artist))
      )
      .subscribe(a => this._selectArtistOpenDialog(a));
  }

  private _selectArtistOpenDialog(artists: ArtistPreview[]) {
    const dialogRef = this.dialog.open(DashboardAllMapFiltersDialogComponent, {
      data: {
        artists,
        onlyNotFound: this.onlyNotFound$.value,
        selectedArtistId: this.selectedArtist$.value
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(v => v !== undefined))
      .subscribe((v: DashboardAllMapFiltersDialogResponse) => {
        this.selectedArtist$.next(v.selectedArtist);
        this.onlyNotFound$.next(v.onlyNotFound);
      });
  }
}

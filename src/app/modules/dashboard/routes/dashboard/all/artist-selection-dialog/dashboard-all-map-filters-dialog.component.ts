import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArtistPreview} from '../../../../../shared/types/artist';
import {DashboardAllMapFiltersDialogData} from './dashboard-all-map-filters-dialog-data';
import {DashboardAllMapFiltersDialogResponse} from './dashboard-all-map-filters-dialog-response';


@Component({
  selector: 'streart-artist-selection-dialog',
  templateUrl: './dashboard-all-map-filters-dialog.component.html',
  styleUrls: ['./dashboard-all-map-filters-dialog.component.css']
})
export class DashboardAllMapFiltersDialogComponent implements OnInit {
  artists: ArtistPreview[];

  selectedArtistId: string = undefined;
  onlyNotFound: boolean;

  constructor(private readonly dialogRef: MatDialogRef<DashboardAllMapFiltersDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: DashboardAllMapFiltersDialogData) {
  }

  ngOnInit() {
    this.artists = this.data.artists;
    this.onlyNotFound = this.data.onlyNotFound;
    this.selectedArtistId = this.data.selectedArtistId;
  }

  sendResponse() {
    this.dialogRef.close(this._generateResponse());
  }

  private _generateResponse(): DashboardAllMapFiltersDialogResponse {
    return {
      selectedArtist: this.selectedArtistId,
      onlyNotFound: this.onlyNotFound
    };
  }
}

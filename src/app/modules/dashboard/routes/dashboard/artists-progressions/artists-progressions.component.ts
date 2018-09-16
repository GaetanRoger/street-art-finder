import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {UserArtistProgression} from '../../../../core/types/user-artist-progression';

@Component({
  selector: 'app-artists-progressions',
  templateUrl: './artists-progressions.component.html',
  styleUrls: ['./artists-progressions.component.css']
})
export class ArtistsProgressionsComponent implements OnInit {
  @Input() progressions: Observable<UserArtistProgression[]>;
  @Output() goToDiscover: EventEmitter<void> = new EventEmitter();
  loading = true;

  constructor() { }

  ngOnInit() {
    this.progressions.subscribe(_ => this.loading = false);
  }

}

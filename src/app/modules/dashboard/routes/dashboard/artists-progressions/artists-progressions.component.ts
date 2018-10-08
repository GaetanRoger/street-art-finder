import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {UserArtistProgression} from '../../../../core/types/user-artist-progression';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';

@Component({
    selector: 'app-artists-progressions',
    templateUrl: './artists-progressions.component.html',
    styleUrls: ['./artists-progressions.component.css']
})
export class ArtistsProgressionsComponent implements OnInit {
    @Input() progressions: Observable<UserArtistProgression[]>;
    @Output() goToDiscover: EventEmitter<void> = new EventEmitter();
    loading = true;

    constructor(private readonly artistProgression: UserArtistProgressionService) {
    }

    ngOnInit() {
        this.progressions.subscribe(_ => this.loading = false);
    }

    removeProgression(progression: UserArtistProgression): void {
        this.artistProgression.remove(progression.objectID);
    }

}

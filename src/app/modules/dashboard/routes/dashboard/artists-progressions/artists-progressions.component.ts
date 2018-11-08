import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {UserArtistProgression} from '../../../../shared/types/user-artist-progression';
import {UserArtistProgressionService} from '../../../../core/services/users/user-artist-progression.service';

@Component({
    selector: 'streat-artists-progressions',
    templateUrl: './artists-progressions.component.html',
    styleUrls: ['./artists-progressions.component.css']
})
export class ArtistsProgressionsComponent implements OnInit {
    @Input() progressions: Observable<UserArtistProgression[]>;
    @Input() isFiltered = false;
    @Output() goToDiscover: EventEmitter<void> = new EventEmitter();
    @Output() artistWasRemoved: EventEmitter<void> = new EventEmitter();
    loading = true;

    constructor(private readonly artistProgression: UserArtistProgressionService) {
    }

    ngOnInit() {
        this.progressions.subscribe(_ => this.loading = false);
    }

    async removeProgression(progression: UserArtistProgression): Promise<void> {
        await this.artistProgression.remove(progression.objectID).toPromise();
        this.artistWasRemoved.emit();
    }

    markAllPiecesAsFound(progression: UserArtistProgression) {
        this.artistProgression.markAllPiecesAsFound(progression);
    }
}

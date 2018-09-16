import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {UserArtistProgression} from '../../../../core/types/user-artist-progression';
import {ArtistService} from '../../../../core/services/artist/artist.service';
import {Artist} from '../../../../core/types/artist';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
    @Input() progressions: Observable<UserArtistProgression[]>;

    artists$: Observable<(Artist & { known: boolean })[]>;

    constructor(private readonly artistService: ArtistService) {
    }

    ngOnInit() {
        const artists$ = this.artistService.findAll();

        this.artists$ = combineLatest(artists$, this.progressions)
            .pipe(
                map(([artists, progressions]) => {
                    return artists.map(a => ({
                        ...a,
                        known: !!progressions.find(p => p.artist.objectID === a.objectID)
                    }));
                    }
                )
            );
    }

}

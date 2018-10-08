import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {UserArtistProgression} from '../../../../core/types/user-artist-progression';
import {ArtistService} from '../../../../core/services/artist/artist.service';
import {Artist} from '../../../../core/types/artist';
import {map} from 'rxjs/operators';
import {UserArtistProgressionService} from '../../../../core/services/user-artist-progression.service';
import {UserService} from '../../../../core/services/user/user.service';
import {User} from '../../../../core/types/user';
import {MatSnackBar} from '@angular/material';
import {DiscoverArtistAddedSnackbarComponent} from './discover-artist-added-snackbar/discover-artist-added-snackbar.component';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
    @Input() progressions: Observable<UserArtistProgression[]>;

    artists$: Observable<(Artist & { known: boolean })[]>;

    private user: User;

    constructor(private readonly userService: UserService,
                private readonly artistService: ArtistService,
                private readonly progressionService: UserArtistProgressionService,
                private readonly snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.userService.user().subscribe(u => this.user = u);

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

    async addArtistToProgression(artist: Artist): Promise<void> {
        await this.progressionService.addArtistProgression(this.user, artist);
        this.snackbar.openFromComponent(DiscoverArtistAddedSnackbarComponent, {duration: 5000});
    }
}

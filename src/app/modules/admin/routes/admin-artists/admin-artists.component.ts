import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {delay, filter, flatMap, tap} from 'rxjs/operators';
import {Artist} from '../../../shared/types/artist';
import {ArtistService} from '../../../core/services/artist/artist.service';

@Component({
    selector: 'streart-admin-artists',
    templateUrl: './admin-artists.component.html',
    styleUrls: ['./admin-artists.component.css']
})
export class AdminArtistsComponent implements OnInit {
    artists$: Observable<Artist[]>;
    filter$: BehaviorSubject<string> = new BehaviorSubject('');
    working$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    selectedArtists: Artist[] = [];

    readonly primaryText = a => a.name;
    readonly secondaryText = a => {
        return `${a.published ? '' : 'NOT PUBLISHED |'} ${a.followers} followers | ${a.piecesCount} pieces`;
    };

    constructor(private readonly artistService: ArtistService,
                private readonly snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.artists$ = this.filter$
            .pipe(
                delay(0), // Fix for ExpressionChangedAfterItHasBeenCheckedError (don't ask why)
                tap(_ => this.working$.next(true)),
                flatMap(f => this.artistService.findAllAndSubscribe(f, {unpublished: true})),
                filter(p => !!p),
                tap(_ => this.working$.next(false))
            );
    }

    async deleteSelectedArtists() {
        this.working$.next(true);

        console.log('TODO: artist deletion not implemented');
        // todo


        this.working$.next(false);
    }

}

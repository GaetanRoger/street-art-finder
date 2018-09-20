import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Artist} from '../../types/artist';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {AngularFireStorage} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-artist-preview',
    templateUrl: './artist-preview.component.html',
    styleUrls: ['./artist-preview.component.css']
})
export class ArtistPreviewComponent implements OnInit {
    @Input() artist: Artist;
    @Input() goToArtistPageOnClick = true;
    @Input() actions: { text: string; id: number; disabled?: boolean }[] = [];
    @Output() actionClick: EventEmitter<number> = new EventEmitter();

    image$: Observable<SafeStyle>;

    constructor(private readonly sanitizer: DomSanitizer,
                private readonly storage: AngularFireStorage) {
    }

    ngOnInit() {
        this.image$ = this.storage
            .ref(this.artist.images.horizontal.low)
            .getDownloadURL()
            .pipe(
                map(url => this.urlToBackground(url))
            );
    }

    private urlToBackground(url: string): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(
            `background-image: url("${url}");`
        );
    }
}

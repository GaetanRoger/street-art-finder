import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Artist} from '../../types/artist';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'streart-artist-preview',
    templateUrl: './artist-preview.component.html',
    styleUrls: ['./artist-preview.component.css']
})
export class ArtistPreviewComponent implements OnInit {
    @Input() artist: Artist;
    @Input() goToArtistPageOnClick = true;
    @Input() actions: { text: string; id: number; disabled?: boolean }[] = [];
    @Output() actionClick: EventEmitter<number> = new EventEmitter();

    image: SafeStyle;

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.image = this.urlToBackground(this.artist.images.horizontal.low);
    }

    private urlToBackground(url: string): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(
            `background-image: url("${url}");`
        );
    }
}

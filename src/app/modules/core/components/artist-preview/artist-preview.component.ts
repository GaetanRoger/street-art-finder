import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Artist} from '../../types/artist';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'app-artist-preview',
    templateUrl: './artist-preview.component.html',
    styleUrls: ['./artist-preview.component.css']
})
export class ArtistPreviewComponent implements OnInit {
    @Input() artist: Artist;
    @Input() goToArtistPageOnClick = true;
    @Input() actions: { text: string; id: number; disabled?: boolean}[] = [];
    @Output() actionClick: EventEmitter<number> = new EventEmitter();

    image: SafeStyle;

    constructor(private readonly sanatizer: DomSanitizer) {
    }

    ngOnInit() {
        this.image = this.sanatizer.bypassSecurityTrustStyle(
            'background-image: url("' + this.artist.images.horizontal.low + '");'
        );
    }
}

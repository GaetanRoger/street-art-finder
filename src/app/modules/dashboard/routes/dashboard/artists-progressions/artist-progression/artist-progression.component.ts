import {Component, Input, OnInit} from '@angular/core';
import {UserArtistProgression} from '../../../../../core/types/user-artist-progression';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'app-artist-progression',
    templateUrl: './artist-progression.component.html',
    styleUrls: ['./artist-progression.component.css']
})
export class ArtistProgressionComponent implements OnInit {
    @Input() progression: UserArtistProgression;

    backgroundImage: SafeValue;

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.backgroundImage = this._generateBackgroundImage();
    }

    private _generateBackgroundImage(): SafeValue {
        const linearGradient = 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255,255, 0.8))';
        const horizontal = this.progression.artist.images.horizontal;

        const image = horizontal.low
            ? `background-image: ${linearGradient}, url("${horizontal.low}");`
            : `background-image: ${linearGradient}, url("${horizontal.normal}");`;

        return this.sanitizer.bypassSecurityTrustStyle(image);
    }
}
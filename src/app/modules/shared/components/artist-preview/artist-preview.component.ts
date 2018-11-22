import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Artist} from '../../types/artist';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ResponsiveService} from '../../../core/services/responsive.service';

@Component({
  selector: 'streart-artist-preview',
  templateUrl: './artist-preview.component.html',
  styleUrls: ['./artist-preview.component.scss']
})
export class ArtistPreviewComponent implements OnInit {
  @Input() artist: Artist;
  @Input() goToArtistPageOnClick = true;
  @Input() actions: { text: string; id: number; disabled?: boolean }[] = [];
  @Output() actionClick: EventEmitter<number> = new EventEmitter();

  image: SafeStyle;

  constructor(private readonly sanitizer: DomSanitizer,
              public readonly responsive: ResponsiveService) {
  }

  ngOnInit() {
    this.responsive.isBigScreen()
      .subscribe(v => {
        const url = v ? this.artist.images.horizontal.normal : this.artist.images.horizontal.low;
        this.image = this.urlToBackground(url);
      });
  }

  private urlToBackground(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `background-image: url("${url}");`
    );
  }
}

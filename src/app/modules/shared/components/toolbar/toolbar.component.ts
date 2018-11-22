import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ToolbarMenuItem} from './toolbar-menu-item';
import {MatMenuTrigger} from '@angular/material';
import {Image} from '../../types/image';
import {Observable, of} from 'rxjs';
import {ResponsiveService} from '../../../core/services/responsive.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'streart-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnChanges {
  /**
   * Title to be displayed in the toolbar.
   */
  @Input() title: string;

  /**
   * Background image to use for background. It will be darken by 50 %.
   * If none or null is provided, see DEFAULT_BACKGROUND_COLOR for the color that will be used.
   */
  @Input() image: string | Image = {
    low: '/assets/images/toolbar-background-low.jpg',
    normal: '/assets/images/toolbar-background.jpg'
  };

  /**
   * Should the search icon button be displayed.
   */
  @Input() showSearchButton = false;

  /**
   * Should the back icon button be displayed. If true, clicking it will go back one route.
   */
  @Input() showBackButton = false;

  @Input() menuItems: ToolbarMenuItem[] = [];

  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  @Output() searchKeyDown: EventEmitter<KeyboardEvent> = new EventEmitter();

  @Output() searchKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();

  filter: string;

  /**
   * Default color to be used if no background image is supplied.
   */
  public readonly DEFAULT_BACKGROUND_COLOR = '#212121';

  /**
   * Safe value of the CSS property to display the provided background image or color.
   */
  backgroundImage$: Observable<SafeValue>;
  /**
   * True to display search text box, false to hide it.
   */
  showSearchBar: boolean;

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  constructor(private readonly sanitizer: DomSanitizer,
              private readonly location: Location,
              private readonly responsive: ResponsiveService) {
  }

  ngOnChanges(): void {
    this.backgroundImage$ = this._generateBackground();
  }

  goBack(): void {
    this.location.back();
  }

  toggleSearch(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  emitSearchChange(event: string) {
    this.searchChange.emit(event);
    this.filter = event;
  }

  /**
   * Generate the background CSS property with the image or the default color.
   */
  private _generateBackground(): Observable<SafeValue> {
    const linearGradient = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))';

    if (!this.image) {
      return of(this._sanatizeStyle(`background-color: ${this.DEFAULT_BACKGROUND_COLOR};`));
    }

    if (typeof this.image !== 'string' && this.image.normal && this.image.low) {
      const img = this.image as Image;
      return this.responsive.isBigScreen()
        .pipe(
          map(bigScreen => bigScreen ? img.normal : img.low),
          map(url => `background-image: ${linearGradient}, url("${url}");`),
          map(css => this._sanatizeStyle(css))
        );
    }

    return of(this._sanatizeStyle(`background-image: ${linearGradient}, url("${this.image}");`));
  }

  private _sanatizeStyle(style: string): SafeValue {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

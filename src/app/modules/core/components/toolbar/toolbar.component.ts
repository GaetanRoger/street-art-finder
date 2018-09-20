import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {ToolbarMenuItem} from './toolbar-menu-item';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnChanges {
    /**
     * Title to be displayed in the toolbar.
     */
    @Input() title: string;

    /**
     * Background image$ to use for background. It will be darken by 50 %.
     * If none or null is provided, see DEFAULT_BACKGROUND_COLOR for the color that will be used.
     */
    @Input() image = '/assets/images/toolbar-background-low.jpg';

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

    /**
     * Default color to be used if no background image$ is supplied.
     */
    public readonly DEFAULT_BACKGROUND_COLOR = '#212121';

    /**
     * Safe value of the CSS property to display the provided background image$ or color.
     */
    backgroundImage: SafeValue;
    /**
     * True to display search text box, false to hide it.
     */
    showSearchBar: boolean;

    constructor(private readonly sanitizer: DomSanitizer,
                private readonly location: Location) {
    }

    ngOnChanges(): void {
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(this.generateBackground());
    }

    goBack(): void {
        this.location.back();
    }

    toggleSearch(): void {
        this.showSearchBar = !this.showSearchBar;
    }

    /**
     * Generate the background CSS property with the image$ or the default color.
     */
    private generateBackground(): string {
        const linearGradient = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))';

        return this.image
            ? `background-image: ${linearGradient}, url("${this.image}");`
            : `background-color: ${this.DEFAULT_BACKGROUND_COLOR};`;
    }

    emitSearchChange(event: string) {
        this.searchChange.emit(event);
    }
}

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ToolbarComponent} from './toolbar.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {ToolbarMenuItem} from './toolbar-menu-item';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const mockMenuItems: ToolbarMenuItem[] = [
    {
        text: 'Test item 1',
        routerLink: '/test1'
    },
    {
        text: 'Test item 2 (disabled)',
        routerLink: '/test2',
        disabled: true
    },
    {
        text: 'Test item 3 (with icon)',
        routerLink: '/test3',
        icon: 'test_icon'
    }
];

fdescribe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let element: HTMLElement;

    const _queryBackButton = (): HTMLButtonElement => {
        return element.querySelector<HTMLButtonElement>('button.back-arrow');
    };

    const _querySearchButton = (): HTMLButtonElement => {
        return element.querySelector<HTMLButtonElement>('button.search-button');
    };

    const _queryMenuButton = (): HTMLButtonElement => {
        return element.querySelector<HTMLButtonElement>('button.menu-button');
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            imports: [
                BrowserAnimationsModule,
                ComponentsLibraryModule,
                FormsModule,
                RouterTestingModule.withRoutes([
                    {path: 'test1', component: ToolbarComponent},
                    {path: 'test2', component: ToolbarComponent},
                    {path: 'test3', component: ToolbarComponent}
                ])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display provided title', () => {
        component.title = 'Test title';
        fixture.detectChanges();

        const title = element.querySelector<HTMLSpanElement>('span.title');
        expect(title.innerText).toBe('Test title');
    });

    it('should display toolbar-background-low.jpg as background image by default', () => {
        fixture.detectChanges();

        expect(component.image).toContain('toolbar-background-low.jpg');
    });

    it('should not display back button nor search button by default', () => {
        fixture.detectChanges();

        const backButton = _queryBackButton();
        const searchButton = _querySearchButton();

        expect(component.showBackButton).toBeFalsy();
        expect(component.showSearchButton).toBeFalsy();

        expect(backButton).toBeNull();
        expect(searchButton).toBeNull();
    });

    it('should not display search bar by default', () => {
        fixture.detectChanges();

        const searchBar = element.querySelector<HTMLElement>('.search-row');

        expect(component.showSearchBar).toBeFalsy();
        expect(searchBar).toBeNull();
    });

    it('should display back button if set to true', () => {
        component.showBackButton = true;
        fixture.detectChanges();

        const backButton = _queryBackButton();

        expect(backButton).not.toBeNull();
    });

    it('should display search button if set to true', () => {
        component.showSearchButton = true;
        fixture.detectChanges();

        const searchButton = _querySearchButton();

        expect(searchButton).not.toBeNull();
    });

    it('should not display the menu icon button if no menu items are provided', () => {
        component.menuItems = [];
        fixture.detectChanges();

        const menuButton = _queryMenuButton();

        expect(menuButton).toBeNull();
    });

    it('should display the menu icon button if menu items are provided', () => {
        component.menuItems = [mockMenuItems[0]];
        fixture.detectChanges();

        const menuButton = _queryMenuButton();

        expect(menuButton).not.toBeNull();
    });
});

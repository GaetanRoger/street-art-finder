import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {UserService} from '../../../core/services/users/user/user.service';
import {of} from 'rxjs';

@Component({
    selector: 'streart-toolbar',
    template: ''
})
class MockToolbarComponent {
    @Input() title: any;
    @Input() showSearchButton: any;
    @Output() searchChange: EventEmitter<string> = new EventEmitter();
}

@Component({
    selector: 'streart-flat-card-with-image',
    template: ''
})
class MockFlatCardWithImageComponent {
    @Input() title: any;
    @Input() text: any;
    @Input() primaryButtonText: any;
    @Input() primaryButtonRouterLink: any;
    @Input() secondaryButtonText: any;
    @Input() secondaryButtonRouterLink: any;
    @Input() image: any;
}

@Component({
    selector: 'streart-if-online',
    template: ''
})
class MockIfOnlineComponent {
    @Input() offlineText: any;
}

@Component({
    selector: 'streart-home-artists-list',
    template: ''
})
class MockHomeArtistListComponent {
    @Input() query: any;
}

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let element: HTMLElement;
    let mockUserService: Partial<UserService>;

    beforeEach(async(() => {
        mockUserService = {
            isLoggedIn: () => of(true)
        };

        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                MockToolbarComponent,
                MockFlatCardWithImageComponent,
                MockIfOnlineComponent,
                MockHomeArtistListComponent
            ],
            imports: [ComponentsLibraryModule],
            providers: [
                {provide: UserService, useValue: mockUserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display the join now button when not logged in', (done: DoneFn) => {
        const userService = fixture.debugElement.injector.get(UserService);
        userService.isLoggedIn = () => of(false);
        fixture.detectChanges();

        component.primaryButtonText$.subscribe(t => {
            expect(t).toBe(component.JOIN_NOW_BUTTON_TEXT);
            done();
        });
    });

    it('should display the dashboard button when logged in', (done: DoneFn) => {
        const userService = fixture.debugElement.injector.get(UserService);
        userService.isLoggedIn = () => of(true);
        fixture.detectChanges();

        component.primaryButtonText$.subscribe(t => {
            expect(t).toBe(component.DASHBOARD_BUTTON_TEXT);
            done();
        });
    });

    it('should link to the join now page when not logged in', (done: DoneFn) => {
        const userService = fixture.debugElement.injector.get(UserService);
        userService.isLoggedIn = () => of(false);
        fixture.detectChanges();

        component.primaryButtonRouterLink$.subscribe(l => {
            expect(l).toBe(component.JOIN_NOW_BUTTON_LINK);
            done();
        });
    });

    it('should link to the dashboard page when logged in', (done: DoneFn) => {
        const userService = fixture.debugElement.injector.get(UserService);
        userService.isLoggedIn = () => of(true);
        fixture.detectChanges();

        component.primaryButtonRouterLink$.subscribe(l => {
            expect(l).toBe(component.DASHBOARD_BUTTON_LINK);
            done();
        });
    });
});

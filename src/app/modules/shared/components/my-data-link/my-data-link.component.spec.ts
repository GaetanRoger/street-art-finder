import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MyDataLinkComponent} from './my-data-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';

describe('MyDataLinkComponent', () => {
    let component: MyDataLinkComponent;
    let fixture: ComponentFixture<MyDataLinkComponent>;
    let location: Location;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyDataLinkComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    {path: 'my-data', component: MyDataLinkComponent}
                ])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyDataLinkComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /my-data on click', fakeAsync(() => {
        const link = element.querySelector<HTMLAnchorElement>('a');
        link.click();
        tick();
        expect(location.path()).toBe('/my-data');
    }));
});

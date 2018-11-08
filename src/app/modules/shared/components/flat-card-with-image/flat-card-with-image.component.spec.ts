import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FlatCardWithImageComponent} from './flat-card-with-image.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';


const inputData = {
    title: 'Test tile',
    titleClass: 'title-class',
    text: 'Test text',
    image: 'https://via.placeholder.com/500x300',
    primaryButtonText: 'Primary text',
    secondaryButtonText: 'Secondary text',
    primaryButtonRouterLink: '/primary-router-link',
    secondaryButtonRouterLink: '/secondary-router-link',
    primaryButtonExternalLink: 'http://example.com/primary',
    secondaryButtonExternalLink: 'http://example.com/secondary',
};

fdescribe('FlatCardWithImageComponent', () => {
    let component: FlatCardWithImageComponent;
    let fixture: ComponentFixture<FlatCardWithImageComponent>;
    let element: HTMLElement;
    let location: Location;

    function setButtonRouterLinkAndQueryIt(button: 'primary' | 'secondary'): HTMLButtonElement {
        component[`${button}ButtonText`] = inputData[`${button}ButtonText`];
        component[`${button}ButtonRouterLink`] = inputData[`${button}ButtonRouterLink`];
        fixture.detectChanges();

        const domButton = element.querySelector<HTMLButtonElement>('button');

        expect(domButton.innerText).toEqual(inputData[`${button}ButtonText`].toLocaleUpperCase());

        return domButton;
    }

    function setButtonExternalLinkAndQueryIt(button: 'primary' | 'secondary'): HTMLAnchorElement {
        component[`${button}ButtonText`] = inputData[`${button}ButtonText`];
        component[`${button}ButtonExternalLink`] = inputData[`${button}ButtonExternalLink`];
        fixture.detectChanges();

        const domButton = element.querySelector<HTMLAnchorElement>('a');

        expect(domButton.innerText).toEqual(inputData[`${button}ButtonText`]);

        return domButton;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlatCardWithImageComponent],
            imports: [
                ComponentsLibraryModule,
                RouterTestingModule.withRoutes([
                    {path: 'primary-router-link', component: FlatCardWithImageComponent},
                    {path: 'secondary-router-link', component: FlatCardWithImageComponent},
                ])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(FlatCardWithImageComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.title = inputData.title;
        component.text = inputData.text;
        component.titleClass = inputData.titleClass;
        component.image = inputData.image;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display given text and title with given title class', () => {
        const h4 = element.querySelector<HTMLHeadingElement>('h4');
        const p = element.querySelector<HTMLParagraphElement>('p');

        expect(h4.innerText).toEqual(inputData.title);
        expect(h4.className).toContain(inputData.titleClass);
        expect(p.innerText).toEqual(inputData.text);
    });

    it('should display primary button if given text and router link', fakeAsync(() => {
        const button = setButtonRouterLinkAndQueryIt('primary');

        button.click();
        tick();

        expect(location.path()).toEqual(inputData.primaryButtonRouterLink);
    }));

    it('should display secondary button if given text and router link', fakeAsync(() => {
        const button = setButtonRouterLinkAndQueryIt('secondary');

        button.click();
        tick();

        expect(location.path()).toEqual(inputData.secondaryButtonRouterLink);
    }));

    it('should display primary button if given text and external link', () => {
        const button = setButtonExternalLinkAndQueryIt('primary');
        expect(button.href).toEqual(inputData.primaryButtonExternalLink);
    });

    it('should display secondary button if given text and external link', () => {
        const button = setButtonExternalLinkAndQueryIt('secondary');
        expect(button.href).toEqual(inputData.secondaryButtonExternalLink);
    });
});

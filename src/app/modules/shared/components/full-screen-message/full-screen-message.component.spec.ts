import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FullScreenMessageComponent} from './full-screen-message.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';


const inputData = {
    icon: 'cloud_off',
    title: 'Test title',
    text: 'Test text',
    actionText: 'Test action test'
};

describe('FullScreenMessageComponent', () => {
    let component: FullScreenMessageComponent;
    let fixture: ComponentFixture<FullScreenMessageComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FullScreenMessageComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FullScreenMessageComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.title = inputData.title;
        component.text = inputData.text;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display provided title and text', () => {
        const h1 = element.querySelector<HTMLHeadingElement>('h1');
        const p = element.querySelector<HTMLParagraphElement>('p');

        expect(h1.innerText).toEqual(inputData.title);
        expect(p.innerText).toEqual(inputData.text);
    });

    it('should not display icon nor button if not provided', () => {
        const icon = element.querySelector<HTMLElement>('mat-icon');
        const button = element.querySelector<HTMLButtonElement>('button');

        expect(icon).toBeNull();
        expect(button).toBeNull();
    });

    it('should display icon if provided', () => {
        component.icon = inputData.icon;
        fixture.detectChanges();

        const icon = element.querySelector<HTMLElement>('mat-icon');

        expect(icon).not.toBeNull();
        expect(icon.innerText).toEqual(inputData.icon);
    });

    it('should display a clickable button if provided', (done: DoneFn) => {
        component.actionText = inputData.actionText;
        fixture.detectChanges();

        const button = element.querySelector<HTMLButtonElement>('button');

        expect(button.innerText).toEqual(inputData.actionText);

        component.action.subscribe(() => done());
        button.click();
    });


});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HelpBubbleComponent} from './help-bubble.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

const inputData = {
    text: 'Input text',
    uid: '123456'
};

describe('HelpBubbleComponent', () => {
    let component: HelpBubbleComponent;
    let fixture: ComponentFixture<HelpBubbleComponent>;
    let element: HTMLElement;

    function _queryHelpTextDiv(el?: HTMLElement): HTMLDivElement | null {
        return (el || element).querySelector<HTMLDivElement>('div.help-text');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HelpBubbleComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpBubbleComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        localStorage.removeItem(`${component.PREFIX}${inputData.uid}`);
        component.text = inputData.text;
        component.uid = inputData.uid;

        fixture.detectChanges();
    });

    it('should display the help bubble with given text', () => {
        expect(component).toBeTruthy();

        const div = element.querySelector<HTMLDivElement>('div.text');

        expect(div.innerText).toEqual(inputData.text);
    });

    it('should be closable by default', () => {
        expect(component.closable).toBeTruthy();
    });


    it('should close when clicked twice if closable', () => {
        const div = _queryHelpTextDiv();

        div.click();
        fixture.detectChanges();
        expect(_queryHelpTextDiv()).not.toBeNull();
        expect(component.clickedOnce).toBeTruthy();

        div.click();
        fixture.detectChanges();
        expect(_queryHelpTextDiv()).toBeNull();
        expect(component.hide).toBeTruthy();
    });

    it('should not close when clicked twice if not closable', () => {
        component.closable = false;
        fixture.detectChanges();

        const div = _queryHelpTextDiv();

        div.click();
        fixture.detectChanges();
        expect(_queryHelpTextDiv()).not.toBeNull();
        expect(component.clickedOnce).toBeFalsy();

        div.click();
        fixture.detectChanges();
        expect(_queryHelpTextDiv()).not.toBeNull();
        expect(component.hide).toBeFalsy();
    });

    it('should create a local storage entry with value true when closed', () => {
        const div = _queryHelpTextDiv();
        div.click();
        fixture.detectChanges();
        div.click();
        fixture.detectChanges();

        expect(localStorage.getItem(`${component.PREFIX}${inputData.uid}`)).toEqual('true');
    });

    it('should not be displayed if the local storage entry is present', () => {
        localStorage.setItem(`${component.PREFIX}${inputData.uid}`, 'true');

        const locFixture = TestBed.createComponent(HelpBubbleComponent);
        const locComponent = locFixture.componentInstance;

        locComponent.text = inputData.text;
        locComponent.uid = inputData.uid;
        locFixture.detectChanges();

        expect(_queryHelpTextDiv(locFixture.nativeElement)).toBeNull();
        expect(locComponent.hide).toBeTruthy();
    });
});

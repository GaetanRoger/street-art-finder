import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadMoreButtonComponent} from './load-more-button.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

const inputData = {
    text: 'Test text',
    noMoreText: 'No more test text',
    loadMoreButtonColor: 'warn'
};

describe('LoadMoreButtonComponent', () => {
    let component: LoadMoreButtonComponent;
    let fixture: ComponentFixture<LoadMoreButtonComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadMoreButtonComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadMoreButtonComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the default text and color if none is provided', () => {
        expect(component.text).toEqual(component.DEFAULT_TEXT);
        expect(component.noMoreText).toEqual(component.DEFAULT_NO_MORE_TEXT);
        expect(component.loadMoreButtonColor).toEqual(component.DEFAULT_LOAD_MORE_BUTTON_COLOR);
    });

    it('should have more to load and not be disabled by default', () => {
        expect(component.noMoreToLoad).toBeFalsy();
        expect(component.disabled).toBeFalsy();
    });

    it('should display the button with given text and color if there is more to load', () => {
        component.text = inputData.text;
        component.loadMoreButtonColor = inputData.loadMoreButtonColor;
        component.noMoreToLoad = false;
        fixture.detectChanges();

        const button = element.querySelector<HTMLButtonElement>('button');
        const matChip = element.querySelector<HTMLElement>('mat-chip');

        expect(matChip).toBeNull();
        expect(button).not.toBeNull();
        expect(button.innerText).toEqual(inputData.text);
        expect(button.getAttribute('ng-reflect-color')).toEqual(inputData.loadMoreButtonColor);
    });

    it('should display the no more text and remove the button if no more to load is true', () => {
        component.noMoreText = inputData.noMoreText;
        component.noMoreToLoad = true;
        fixture.detectChanges();

        const button = element.querySelector<HTMLButtonElement>('button');
        const matChip = element.querySelector<HTMLElement>('mat-chip');

        expect(button).toBeNull();
        expect(matChip).not.toBeNull();
        expect(matChip.innerText).toEqual(inputData.noMoreText);
    });

    it('should be disabled if disabled set to true', () => {
        component.disabled = true;
        fixture.detectChanges();

        const button = element.querySelector<HTMLButtonElement>('button');

        expect(button).not.toBeNull();
        expect(button.disabled).toBeTruthy();
    });
});

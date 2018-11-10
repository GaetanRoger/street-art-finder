import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingSpinnerComponent} from './loading-spinner.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

const inputData = {
    text: 'Test text'
};

describe('LoadingSpinnerComponent', () => {
    let component: LoadingSpinnerComponent;
    let fixture: ComponentFixture<LoadingSpinnerComponent>;
    let element: HTMLElement;

    const querySpinner = (): HTMLElement => {
        return element.querySelector<HTMLElement>('mat-spinner');
    };

    const queryText = (): HTMLDivElement => {
        return element.querySelector<HTMLDivElement>('div.text');
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingSpinnerComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingSpinnerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a spinner without text when none is provided', () => {
        const spinner = querySpinner();
        const text = queryText();

        expect(spinner).not.toBeNull();
        expect(text).toBeNull();
    });

    it('should display a spinner with text when provided', () => {
        component.text = inputData.text;
        fixture.detectChanges();

        const spinner = querySpinner();
        const text = queryText();

        expect(spinner).not.toBeNull();
        expect(text).not.toBeNull();
        expect(text.innerText).toEqual(inputData.text);
    });
});

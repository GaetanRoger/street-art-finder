import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmationDialogData} from './confirmation-dialog-data';

const testDialogDataSimple: ConfirmationDialogData = {
    title: 'Test title',
    text: 'Test Text'
};
const testDialogDataComplete: ConfirmationDialogData = {
    ...testDialogDataSimple,
    mainButtonColor: 'warn',
    submitActivationDelay: 3000
};

fdescribe('ConfirmationDialogComponent', () => {
    let component: ConfirmationDialogComponent;
    let fixture: ComponentFixture<ConfirmationDialogComponent>;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmationDialogComponent],
            imports: [ComponentsLibraryModule],
            providers: [
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: []},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationDialogComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a dialog with given title and text', fakeAsync(() => {
        // @ts-ignore Injecting input data
        component.data = testDialogDataSimple;
        fixture.detectChanges();

        const h2Text = element.querySelector<HTMLHeadingElement>('h2').innerText;
        const pText = element.querySelector<HTMLParagraphElement>('p').innerText;
        const yesButton = element.querySelector<HTMLButtonElement>('button.yes-button');
        const noButton = element.querySelector<HTMLButtonElement>('button.no-button');

        expect(h2Text).toEqual(testDialogDataSimple.title);
        expect(pText).toEqual(testDialogDataSimple.text);
        expect(yesButton.innerText).toEqual('YES');
        expect(noButton.innerText).toEqual('NO');
    }));

    it('should wait for given time before enabling yes button and applying the color', fakeAsync(() => {
        // @ts-ignore Injecting input data
        component.data = testDialogDataComplete;
        fixture.detectChanges();

        const yesButton = element.querySelector<HTMLButtonElement>('button.yes-button');

        expect(yesButton.innerText).toContain('3 SEC');
        expect(yesButton.disabled).toBeTruthy();

        tick(1000);
        fixture.detectChanges();
        expect(yesButton.innerText).toContain('2 SEC');
        expect(yesButton.disabled).toBeTruthy();

        tick(1000);
        fixture.detectChanges();
        expect(yesButton.innerText).toContain('1 SEC');
        expect(yesButton.disabled).toBeTruthy();

        tick(1000);
        fixture.detectChanges();
        expect(yesButton.innerText).toEqual('YES');
        expect(yesButton.disabled).toBeFalsy();

        expect(yesButton.getAttribute('ng-reflect-color')).toEqual(testDialogDataComplete.mainButtonColor);
    }));
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageComponent} from './image.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {SharedModule} from '../../shared.module';

const inputData = {
    src: 'https://via.placeholder.com/100',
    alt: 'Alt test text',
    imgWidth: 50,
    imgHeight: 40
};

describe('ImageComponent', () => {
    let component: ImageComponent;
    let fixture: ComponentFixture<ImageComponent>;
    let element: HTMLElement;

    function _queryImg(): HTMLImageElement {
        return element.querySelector<HTMLImageElement>('img');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ComponentsLibraryModule, SharedModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.src = inputData.src;
        component.alt = inputData.alt;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should display given image with given alt text', () => {
        const img = _queryImg();

        expect(img.src).toEqual(inputData.src);
        expect(img.alt).toEqual(inputData.alt);
    });

    it('should not be round nor fit but cover by default', () => {
        expect(component.round).toBeFalsy();
        expect(component.fit).toBeFalsy();
        expect(component.cover).toBeTruthy();
    });

    it('should display given image with given size', () => {
        component.imgHeight = inputData.imgHeight;
        component.imgWidth = inputData.imgWidth;
        fixture.detectChanges();

        const img = _queryImg();

        expect(img.style.width).toEqual(inputData.imgWidth + 'px');
        expect(img.style.height).toEqual(inputData.imgHeight + 'px');
    });

    it('should have 100 % width if fit set to true', () => {
        component.fit = true;
        fixture.detectChanges();

        const img = _queryImg();

        expect(img.style.width).toEqual('100%');
    });

    it('should be set as object-fit cover if cover set to true', () => {
        component.cover = true;
        fixture.detectChanges();

        const img = _queryImg();

        expect(img.style['object-fit']).toEqual('cover');
    });

    it('should have a border radius of 50% if round is true', () => {
        component.round = true;
        fixture.detectChanges();

        const img = _queryImg();

        expect(img.style['border-radius']).toEqual('50%');
    });
});

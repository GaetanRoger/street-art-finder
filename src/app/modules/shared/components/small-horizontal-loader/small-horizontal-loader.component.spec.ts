import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallHorizontalLoaderComponent} from './small-horizontal-loader.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';

describe('SmallHorizontalLoaderComponent', () => {
    let component: SmallHorizontalLoaderComponent;
    let fixture: ComponentFixture<SmallHorizontalLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SmallHorizontalLoaderComponent],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmallHorizontalLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LearnMoreComponent} from './learn-more.component';
import {Component, Input} from '@angular/core';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {ImageComponent} from '../../../shared/components/image/image.component';
import {SmallLoadingSpinnerComponent} from '../../../shared/components/small-loading-spinner/small-loading-spinner.component';

@Component({
    selector: 'streart-toolbar',
    template: ''
})
class MockToolbarComponent {
    @Input() title: any;
    @Input() showBackButton: any;
    @Input() showSearchButton: any;
}

@Component({
    selector: 'streart-flat-card-with-image',
    template: ''
})
class MockFlatCardWithComponent {
    @Input() title: any;
    @Input() text: any;
    @Input() titleClass: any;
}

fdescribe('LearnMoreComponent', () => {
    let component: LearnMoreComponent;
    let fixture: ComponentFixture<LearnMoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LearnMoreComponent,
                ImageComponent,
                SmallLoadingSpinnerComponent,
                MockToolbarComponent,
                MockFlatCardWithComponent
            ],
            imports: [ComponentsLibraryModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LearnMoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

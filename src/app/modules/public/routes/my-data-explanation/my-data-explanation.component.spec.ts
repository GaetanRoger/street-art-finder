import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyDataExplanationComponent} from './my-data-explanation.component';
import {Component, Input} from '@angular/core';

@Component({
    selector: 'streart-toolbar',
    template: ''
})
class MockToolbarComponent {
    @Input() title: any;
    @Input() showBackButton: any;
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

describe('MyDataExplanationComponent', () => {
    let component: MyDataExplanationComponent;
    let fixture: ComponentFixture<MyDataExplanationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MyDataExplanationComponent,
                MockToolbarComponent,
                MockFlatCardWithComponent
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyDataExplanationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

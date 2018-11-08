import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectableListComponent} from './selectable-list.component';

describe('SelectableListComponent', () => {
    let component: SelectableListComponent<any>;
    let fixture: ComponentFixture<SelectableListComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectableListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectableListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

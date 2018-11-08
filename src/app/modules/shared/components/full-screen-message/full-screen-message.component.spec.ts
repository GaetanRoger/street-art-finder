import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FullScreenMessageComponent} from './full-screen-message.component';

describe('FullScreenMessageComponent', () => {
    let component: FullScreenMessageComponent;
    let fixture: ComponentFixture<FullScreenMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FullScreenMessageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FullScreenMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

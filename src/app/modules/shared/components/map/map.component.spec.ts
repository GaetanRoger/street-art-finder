import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';

describe('MapComponent', () => {
    let component: MapComponent<any>;
    let fixture: ComponentFixture<MapComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

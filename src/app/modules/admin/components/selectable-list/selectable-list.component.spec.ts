import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectableListComponent} from './selectable-list.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {SmallLoadingSpinnerComponent} from '../../../shared/components/small-loading-spinner/small-loading-spinner.component';

describe('SelectableListComponent', () => {
    let component: SelectableListComponent<any>;
    let fixture: ComponentFixture<SelectableListComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [ComponentsLibraryModule],
            declarations: [SelectableListComponent, SmallLoadingSpinnerComponent]
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

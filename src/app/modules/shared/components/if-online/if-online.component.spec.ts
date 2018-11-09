import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IfOnlineComponent} from './if-online.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {SharedModule} from '../../shared.module';
import {OnlineService} from '../../../core/services/online/online.service';
import {BehaviorSubject} from 'rxjs';

describe('IfOnlineComponent', () => {
    let component: IfOnlineComponent;
    let fixture: ComponentFixture<IfOnlineComponent>;
    let element: HTMLElement;

    const onlineBehaviour: BehaviorSubject<boolean> = new BehaviorSubject(true);
    const mockOnlineService: OnlineService = {
        onlineChanges: onlineBehaviour,
        online: onlineBehaviour.value
    };

    function _getOfflineMessageComponent(): HTMLElement {
        return element.querySelector<HTMLElement>('.if-offline');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                ComponentsLibraryModule,
                SharedModule
            ],
            providers: [
                {provide: OnlineService, useValue: mockOnlineService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IfOnlineComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should not display offline message if online', () => {
        onlineBehaviour.next(true);
        fixture.detectChanges();

        const off = _getOfflineMessageComponent();
        expect(off).toBeNull();
    });

    it('should display offline message if offline', () => {
        onlineBehaviour.next(false);
        fixture.detectChanges();

        const off = _getOfflineMessageComponent();
        expect(off).not.toBeNull();
    });
});

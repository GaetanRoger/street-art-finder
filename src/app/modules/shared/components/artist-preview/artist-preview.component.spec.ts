import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ArtistPreviewComponent} from './artist-preview.component';
import {ComponentsLibraryModule} from '../../../components-library/components-library.module';
import {CoreModule} from '../../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {mockArtist} from '../../../../../mocks/data/mock-artist';

const testActions: { text: string, id: number, disabled?: boolean }[] = [
    {
        text: 'Test action 0',
        id: 1
    },
    {
        text: 'Test action 1',
        id: 2,
        disabled: true
    },
    {
        text: 'Test action 2',
        id: 3
    }
];

describe('ArtistPreviewComponent', () => {
    let component: ArtistPreviewComponent;
    let fixture: ComponentFixture<ArtistPreviewComponent>;
    let element: HTMLElement;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArtistPreviewComponent],
            imports: [
                CoreModule,
                RouterTestingModule.withRoutes([{
                    path: 'artist/:id',
                    component: ArtistPreviewComponent
                }]),
                ComponentsLibraryModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(ArtistPreviewComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.artist = mockArtist;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain artist name and text', () => {
        const h4Text = element.querySelector('h4').textContent;
        const pText = element.querySelector('p').textContent;

        expect(h4Text).toEqual(mockArtist.name);
        expect(pText).toEqual(mockArtist.text);
    });

    it('should contain a button if an action is provided', () => {
        const buttonsBefore = element.querySelectorAll('button');

        component.actions = [testActions[0]];
        fixture.detectChanges();

        const buttonsAfter = element.querySelectorAll('button');

        expect(buttonsBefore.length).toEqual(0);
        expect(buttonsAfter.length).toEqual(1);
        expect(buttonsAfter[0].textContent).toEqual(testActions[0].text);
    });

    it('should contain three buttons if three actions are provided', () => {
        const buttonsBefore = element.querySelectorAll('button');

        component.actions = testActions;
        fixture.detectChanges();

        const buttonsAfter = element.querySelectorAll<HTMLButtonElement>('button');

        expect(buttonsBefore.length).toEqual(0);
        expect(buttonsAfter.length).toEqual(3);

        const buttonsArray = Array.from(buttonsAfter) as HTMLButtonElement[];
        const buttonFromAction0 = buttonsArray.find(b => b.textContent === testActions[0].text);
        const buttonFromAction1 = buttonsArray.find(b => b.textContent === testActions[1].text);
        const buttonFromAction2 = buttonsArray.find(b => b.textContent === testActions[2].text);

        expect(buttonFromAction0).not.toBeUndefined();
        expect(buttonFromAction1).not.toBeUndefined();
        expect(buttonFromAction2).not.toBeUndefined();

        const disabledButton = element.querySelector<HTMLButtonElement>('button:disabled');
        expect(disabledButton).not.toBeNull();
        expect(disabledButton.textContent).toEqual(buttonFromAction1.textContent);
    });

    it('should emit the given action id event when button is clicked', (done: DoneFn) => {
        component.actions = [testActions[0]];
        const click$ = component.actionClick;
        fixture.detectChanges();

        click$.subscribe(id => {
            expect(id).toEqual(testActions[0].id);
            done();
        });

        element.querySelector<HTMLButtonElement>('button').click();
        fixture.detectChanges();
    });

    it('should navigate to artist page on click if goToArtistPageOnClick is true', fakeAsync(() => {
        component.goToArtistPageOnClick = true;
        fixture.detectChanges();

        const artistCard = element.querySelector<HTMLDivElement>('.artist-card');
        artistCard.click();

        tick();

        expect(location.path()).toEqual(`/artist/${mockArtist.objectID}`);
    }));

});

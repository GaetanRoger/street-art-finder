import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Artist} from '../../../../shared/types/artist';
import {ArtistService} from '../../../../core/services/artist/artist.service';
import {debounceTime, filter, flatMap, tap} from 'rxjs/operators';
import {AddressFromGeopointService} from '../../../../core/services/location/address-from-geopoint/address-from-geopoint.service';
import {Address} from '../../../../shared/types/address';

@Component({
    selector: 'streat-admin-add-piece-general-info',
    templateUrl: './admin-add-piece-general-info.component.html',
    styleUrls: ['./admin-add-piece-general-info.component.css']
})
export class AdminAddPieceGeneralInfoComponent implements OnInit {
    @Input() formGroup: FormGroup;
    artists$: Observable<Artist[]>;
    address: Address;

    constructor(private readonly fb: FormBuilder,
                private readonly artistService: ArtistService,
                private readonly addressService: AddressFromGeopointService) {
    }

    get name(): FormControl {
        return this.formGroup.get('name') as FormControl;
    }

    get text(): FormControl {
        return this.formGroup.get('text') as FormControl;
    }

    get vanished(): FormControl {
        return this.formGroup.get('vanished') as FormControl;
    }

    get artist(): FormControl {
        return this.formGroup.get('artist') as FormControl;
    }

    get location(): FormGroup {
        return this.formGroup.get('location') as FormGroup;
    }

    get latitude(): FormControl {
        return this.location.get('latitude') as FormControl;
    }

    get longitude(): FormControl {
        return this.location.get('longitude') as FormControl;
    }

    ngOnInit() {
        this.artists$ = this.artist.valueChanges
            .pipe(
                flatMap(query => this.artistService.search(query))
            );
        this._retrieveInfoFromGeopoint();
    }

    displayWith(artist: Artist) {
        return artist ? artist.name : undefined;
    }

    private _retrieveInfoFromGeopoint() {
        this.location.valueChanges
            .pipe(
                tap(() => this.address ? this.address.city = undefined : null),
                tap(() => this.location.setErrors({...this.location.errors, loading: true})),
                debounceTime(1000),
                filter(loc => !!loc.latitude && !!loc.longitude),
                flatMap(loc => this.addressService.get(loc))
            )
            .subscribe(v => {
                this.address = v;
                if (!v || !v.city) {
                    this.location.setErrors({noCity: true});

                } else {
                    this.location.setErrors(null);
                }
            });
    }

    moreInfo() {
        // todo better
        let displayname: string;

        if (this.address && this.address.displayName) {
            displayname = this.address.displayName;
        } else {
            displayname = ' nothing';
        }

        alert('Streart needs a city for each piece to work. What was found there : ' + displayname);
    }
}

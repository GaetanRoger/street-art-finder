import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Artist} from '../../../../core/types/artist';
import {ArtistService} from '../../../../core/services/artist/artist.service';
import {flatMap} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-admin-add-piece-general-info',
    templateUrl: './admin-add-piece-general-info.component.html',
    styleUrls: ['./admin-add-piece-general-info.component.css']
})
export class AdminAddPieceGeneralInfoComponent implements OnInit {
    @Input() formGroup: FormGroup;
    artists$: Observable<Artist[]>;

    constructor(private readonly fb: FormBuilder,
                private readonly artistService: ArtistService) {
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
                flatMap(query => this.artistService.findAll(query))
            );
    }

    displayWith(artist: Artist) {
        return artist ? artist.name : undefined;
    }

}

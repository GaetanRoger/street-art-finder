import {FormControl, FormGroup, Validators} from '@angular/forms';
import {artistValidator} from './artist.validator';

export class PieceGroup {
    general = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        text: new FormControl('', [Validators.required, Validators.minLength(3)]),
        vanished: new FormControl(false),
        accessible: new FormControl(false),
        artist: new FormControl('', [Validators.required, artistValidator]),
        location: new FormGroup({
            latitude: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
            longitude: new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)])
        })
    });
}

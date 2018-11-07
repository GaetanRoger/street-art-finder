import {AbstractControl} from '@angular/forms';

export const artistValidator = (control: AbstractControl): { [key: string]: any } | null => {
    const artist = control.value;
    const valid = !artist ||
        (typeof artist.objectID === 'string'
        && typeof artist.name === 'string');

    return valid ? null : {invalid: true};
};

import {Injectable} from '@angular/core';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImageResizerService {

    constructor(private readonly resizer: Ng2ImgMaxService) {
    }

    resize(blob: Blob, name: string, maxWidth: number = 500, maxHeight: number = 500): Promise<Blob> {
        const file = new File([blob], name, {type: blob.type});

        return this.resizer
            .resize([file], maxWidth, maxHeight)
            .pipe(take(1))
            .toPromise();
    }

}

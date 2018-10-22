import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OnlineService {

    constructor() {
    }

    get online(): boolean {
        return navigator.onLine;
    }
}

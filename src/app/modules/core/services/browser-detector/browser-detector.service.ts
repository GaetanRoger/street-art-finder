import {Injectable} from '@angular/core';
import * as bowser from 'bowser';
import {BrowserInfo} from './browser-info';

@Injectable({
    providedIn: 'root'
})
export class BrowserDetectorService {

    constructor() {
    }

    detect(): BrowserInfo {
        const parser = bowser.getParser(window.navigator.userAgent);
        return {
            ...parser.getPlatform(),
            ...parser.getBrowser()
        };
    }
}

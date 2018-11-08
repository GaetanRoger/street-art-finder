import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OnlineService {
    private readonly _onlineObservable: BehaviorSubject<boolean>;
    private _lastValue = this.online;

    constructor() {
        this._onlineObservable = new BehaviorSubject(this.online);
        fromEvent(window, 'online')
            .subscribe(() => this._onlineObservable.next(true));
        fromEvent(window, 'offline')
            .subscribe(() => this._onlineObservable.next(false));
    }

    get online(): boolean {
        return navigator.onLine;
    }

    get onlineChanges(): Observable<boolean> {
        return this._onlineObservable;
    }

}

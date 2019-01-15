import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OnlineService {
    private readonly _onlineObservable: BehaviorSubject<boolean>;
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

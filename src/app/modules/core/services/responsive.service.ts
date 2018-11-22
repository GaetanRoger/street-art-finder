import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly BIG_SCREEN_MIN_SIZE = '799px';

  private readonly _isBigScreen$: BehaviorSubject<boolean>;

  constructor() {
    const watchMedia = window.matchMedia(`(min-width: ${this.BIG_SCREEN_MIN_SIZE})`);

    this._isBigScreen$ = new BehaviorSubject(watchMedia.matches);
    watchMedia.addEventListener('change', evt => this._isBigScreen$.next(evt.matches));
  }

  isBigScreen(): Observable<boolean> {
    return this._isBigScreen$;
  }
}

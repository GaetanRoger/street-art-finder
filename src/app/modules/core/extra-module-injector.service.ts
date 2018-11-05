import {Injectable, Injector} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtraModuleInjectorService {
    private static injector: Injector;

    public static get<T>(token: any) {
        if (ExtraModuleInjectorService.injector) {
            return ExtraModuleInjectorService.injector.get<T>(token);
        }
    }

    constructor(public injector: Injector) {
        ExtraModuleInjectorService.injector = injector;
    }
}

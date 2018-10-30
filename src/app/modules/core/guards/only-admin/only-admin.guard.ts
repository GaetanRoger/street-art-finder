import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {UserService} from '../../services/users/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {
    constructor(private readonly userService: UserService,
                private readonly router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.user().pipe(
            take(1),
            map(user => {
                    if (user && user.roles.admin) {
                        return true;
                    } else {
                        this.router.navigate(['/'], {skipLocationChange: true});
                        return false;
                    }
                }
            )
        );
    }
}

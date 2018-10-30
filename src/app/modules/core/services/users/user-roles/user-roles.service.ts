import {Injectable} from '@angular/core';
import {UserRoles} from '../../../../shared/types/user';

@Injectable({
    providedIn: 'root'
})
export class UserRolesService {
    public readonly DEFAULT_ROLES: UserRoles = {
        user: true
    };

    constructor() {
    }
}

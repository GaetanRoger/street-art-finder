import {TestBed} from '@angular/core/testing';

import {OnlyAdminGuard} from './only-admin.guard';
import {UserService} from '../../services/users/user/user.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('OnlyAdminGuard', () => {
  let mockUserService: Partial<UserService>;

  beforeEach(() => {
    mockUserService = {
      user: () => of({roles: {admin: true}} as any)
    };

    return TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: UserService, useValue: mockUserService},
        OnlyAdminGuard
      ]
    });
  });

  it('should create', () => {
    const guard = TestBed.get(OnlyAdminGuard);
    expect(guard).toBeTruthy();
  });

  it('should guard if not admin', async () => {
    mockUserService = {
      user: () => of({roles: {admin: false}} as any)
    };
    TestBed.overrideProvider(UserService, {useValue: mockUserService});
    const guard: OnlyAdminGuard = TestBed.get(OnlyAdminGuard);
    const result = await guard.canActivate(null, null).toPromise();

    expect(result).toBeFalsy();
  });

  it('should guard if admin', async () => {
    mockUserService = {
      user: () => of({roles: {admin: true}} as any)
    };
    TestBed.overrideProvider(UserService, {useValue: mockUserService});
    const guard: OnlyAdminGuard = TestBed.get(OnlyAdminGuard);
    const result = await guard.canActivate(null, null).toPromise();

    expect(result).toBeTruthy();
  });
});

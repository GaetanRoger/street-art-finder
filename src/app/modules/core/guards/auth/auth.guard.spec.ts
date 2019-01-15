import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../services/users/user/user.service';
import {of} from 'rxjs';

describe('AuthGuard', () => {
  let mockUserService: Partial<UserService>;

  beforeEach(() => {
    mockUserService = {
      isLoggedIn: () => of(true)
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {provide: UserService, useValue: mockUserService}
      ]
    });
  });

  it('should guard if not logged in', async () => {
    mockUserService = {
      isLoggedIn: () => of(false)
    };
    TestBed.overrideProvider(UserService, {useValue: mockUserService});

    const guard: AuthGuard = TestBed.get(AuthGuard);
    const result = await guard.canActivate(null, null).toPromise();

    expect(result).toBeFalsy();
  });

  it('should not guard if logged in', async () => {
    mockUserService = {
      isLoggedIn: () => of(true)
    };
    TestBed.overrideProvider(UserService, {useValue: mockUserService});

    const guard: AuthGuard = TestBed.get(AuthGuard);
    const result = await guard.canActivate(null, null).toPromise();

    expect(result).toBeTruthy();
  });
});

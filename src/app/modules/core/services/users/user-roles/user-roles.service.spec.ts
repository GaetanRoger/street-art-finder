import { TestBed, inject } from '@angular/core/testing';

import { UserRolesService } from './user-roles.service';

describe('UserRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRolesService]
    });
  });

  it('should be created', inject([UserRolesService], (service: UserRolesService) => {
    expect(service).toBeTruthy();
  }));
});

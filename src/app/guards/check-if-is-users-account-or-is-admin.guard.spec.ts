import { TestBed } from '@angular/core/testing';

import { CheckIfIsUsersAccountOrIsAdminGuard } from './check-if-is-users-account-or-is-admin.guard';

describe('CheckIfIsUsersAccountOrIsAdminGuard', () => {
  let guard: CheckIfIsUsersAccountOrIsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIfIsUsersAccountOrIsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

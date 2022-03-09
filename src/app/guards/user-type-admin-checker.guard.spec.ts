import { TestBed } from '@angular/core/testing';

import { UserTypeAdminCheckerGuard } from './user-type-admin-checker.guard';

describe('UserTypeCheckerGuard', () => {
  let guard: UserTypeAdminCheckerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserTypeAdminCheckerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

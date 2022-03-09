import { TestBed } from '@angular/core/testing';

import { UserTypeAuthCheckerGuard } from './user-type-auth-checker.guard';

describe('UserTypeAuthCheckerGuard', () => {
  let guard: UserTypeAuthCheckerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserTypeAuthCheckerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

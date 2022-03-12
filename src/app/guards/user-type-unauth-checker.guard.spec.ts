import { TestBed } from '@angular/core/testing';

import { UserTypeUnauthCheckerGuard } from './user-type-unauth-checker.guard';

describe('UserTypeUnauthCheckerGuard', () => {
  let guard: UserTypeUnauthCheckerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserTypeUnauthCheckerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

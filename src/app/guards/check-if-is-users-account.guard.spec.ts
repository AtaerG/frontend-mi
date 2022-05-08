import { TestBed } from '@angular/core/testing';

import { CheckIfIsUsersAccountGuard } from './check-if-is-users-account.guard';

describe('CheckIfIsUsersAccountGuard', () => {
  let guard: CheckIfIsUsersAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIfIsUsersAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

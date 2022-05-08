import { TestBed } from '@angular/core/testing';

import { CheckOrderIsUsersGuard } from './check-order-is-users.guard';

describe('CheckOrderIsUsersGuard', () => {
  let guard: CheckOrderIsUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckOrderIsUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

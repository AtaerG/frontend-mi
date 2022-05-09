import { TestBed } from '@angular/core/testing';

import { CheckOrderIsUserOrAdminGuard } from './check-order-is-user-or-admin.guard';

describe('CheckOrderIsUserOrAdminGuard', () => {
  let guard: CheckOrderIsUserOrAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckOrderIsUserOrAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

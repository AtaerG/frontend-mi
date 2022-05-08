import { TestBed } from '@angular/core/testing';

import { UserTypeNormalGuard } from './user-type-normal.guard';

describe('UserTypeNormalGuard', () => {
  let guard: UserTypeNormalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserTypeNormalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

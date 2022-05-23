import { TestBed } from '@angular/core/testing';

import { CheckIfNormalOrUnauthGuard } from './check-if-normal-or-unauth.guard';

describe('CheckIfNormalOrUnauthGuard', () => {
  let guard: CheckIfNormalOrUnauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckIfNormalOrUnauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

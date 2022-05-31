import { TestBed } from '@angular/core/testing';

import { AccessToMsgGuard } from './access-to-msg.guard';

describe('AccessToMsgGuard', () => {
  let guard: AccessToMsgGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessToMsgGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

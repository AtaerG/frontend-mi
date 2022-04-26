import { TestBed } from '@angular/core/testing';

import { GetUserOrderResolver } from './get-user-order.resolver';

describe('GetUserOrderResolver', () => {
  let resolver: GetUserOrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetUserOrderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

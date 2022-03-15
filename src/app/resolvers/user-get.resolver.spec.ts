import { TestBed } from '@angular/core/testing';

import { UserGetResolver } from './user-get.resolver';

describe('UserGetResolver', () => {
  let resolver: UserGetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserGetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AllUsersResolver } from './all-users.resolver';

describe('AllUsersResolver', () => {
  let resolver: AllUsersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllUsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AllAdminsResolver } from './all-admins.resolver';

describe('AllAdminsResolver', () => {
  let resolver: AllAdminsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllAdminsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

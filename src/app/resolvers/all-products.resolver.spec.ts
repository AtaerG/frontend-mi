import { TestBed } from '@angular/core/testing';

import { AllProductsResolver } from './all-products.resolver';

describe('AllProductsResolver', () => {
  let resolver: AllProductsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllProductsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

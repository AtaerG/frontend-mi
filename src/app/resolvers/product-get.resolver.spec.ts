import { TestBed } from '@angular/core/testing';

import { ProductGetResolver } from './product-get.resolver';

describe('ProductGetResolver', () => {
  let resolver: ProductGetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductGetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

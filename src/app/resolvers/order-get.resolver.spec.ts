import { TestBed } from '@angular/core/testing';

import { OrderGetResolver } from './order-get.resolver';

describe('OrderGetResolver', () => {
  let resolver: OrderGetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderGetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

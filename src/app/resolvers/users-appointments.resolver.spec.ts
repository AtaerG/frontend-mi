import { TestBed } from '@angular/core/testing';

import { UsersAppointmentsResolver } from './users-appointments.resolver';

describe('UsersAppointmentsResolver', () => {
  let resolver: UsersAppointmentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UsersAppointmentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

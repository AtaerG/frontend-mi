import { TestBed } from '@angular/core/testing';

import { UserCheckIdAppointmentGuard } from './user-check-id-appointment.guard';

describe('UserCheckIdAppointmentGuard', () => {
  let guard: UserCheckIdAppointmentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCheckIdAppointmentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

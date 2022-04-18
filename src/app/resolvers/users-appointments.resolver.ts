import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersAppointmentsResolver implements Resolve<Appointment[]> {

  constructor(private userService: UserService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Appointment[]> {
    return this.userService.getAllAppointmentsOfUser();
  }
}

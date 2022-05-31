import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { AppointmentService } from '../services/appointment.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserCheckIdAppointmentGuard implements CanActivate {
  constructor(private router: Router, private appointmentService: AppointmentService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((observer) => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token === null) {
        this.router.navigate(['/access_denied']);
      } else {
        let obj_token = JSON.parse(token);
        let user_id = obj_token['user_id'];
        let user_role = obj_token['user_role'];
        let id = route.params['id'];
        let app: Appointment;
        this.appointmentService.getAppointment(id).subscribe({
          next: (res: any) => {
            app = res;
          },
          error: () => {
            this.router.navigate(['/access_denied']);
          },
          complete: () => {
            if (user_role == 'admin') {
              if (app.admin_id === user_id) {
                observer.next(true);
              } else {
                this.router.navigate(['/access_denied']);
              }
            } else {
              if (app.user_id === user_id) {
                observer.next(true);
              } else {
                this.router.navigate(['/access_denied']);
              }
            }
          }
        }
        );
      }
    });
  }
}

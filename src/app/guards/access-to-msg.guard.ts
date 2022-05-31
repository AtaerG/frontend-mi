import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';

@Injectable({
  providedIn: 'root'
})
export class AccessToMsgGuard implements CanActivate {
  constructor(private router: Router, private appointmentService: AppointmentService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = route.params['id'];
        return new Observable<boolean>((observer) => {
          const token = localStorage.getItem('token');
          let user_id= 0;
          let data!: any;
          let user_role = '';
          if (token != null) {
            let obj_token = JSON.parse(token);
            user_id = obj_token.user_id;
            user_role = obj_token.user_role;
          } else {
            this.router.navigate(['/access_denied']);
          }
          this.appointmentService.getDateOfAppointment(id).subscribe({
            next: (res: any) => {
              data = res;
            },
            error: () => {
              this.router.navigate(['/access_denied']);
            },
            complete: () =>{
              let date = data[0].date;
              let time = data[0].time;
              let dia = date.slice(0, 2);
              let mes =  date.slice(3, 5);
              let year =  date.slice(6, 10);
              let app_date = new Date(year, mes-1, dia);
              let today = new Date();
              console.log(app_date);
              console.log(today);
              if (today <= app_date) {
                console.log('access denied');
                this.router.navigate(['/access_denied']);
              } else {
                observer.next(true);
              }
            }
          }
          );
       });

  }

}

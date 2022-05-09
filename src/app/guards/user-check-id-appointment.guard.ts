import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCheckIdAppointmentGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let checker = false;
        const token = localStorage.getItem('token');
        console.log(token);
        if(token === null) {
          checker = false;
        } else {
          let obj_token = JSON.parse(token);
          let user_role = obj_token['user_role'];
          let user_id =obj_token['user_id'];
          if (user_role === 'normal_user') {
            let id = route.paramMap.get('id')
            if(user_id == id){
              checker = true;
            } else {
              checker = false;
            }
          } else {
            checker = true;
          }
        }
        if(!checker){
          return this.router.createUrlTree(['/access_denied']);
        }
        return checker;
      }
  }


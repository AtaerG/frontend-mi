import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeAdminCheckerGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let checker = false;
      const token = localStorage.getItem('token');
      if(token === null) {
        checker = false;
      } else {
        let obj_token = JSON.parse(token);
        let user_role = obj_token['user_role'];
        if (user_role === 'normal_user') {
          checker = false;
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


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeUnauthCheckerGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let checker = false;
      const token = localStorage.getItem('token');
      console.log(token);
      if(token === null) {
        checker = true;
      } else {
        checker = false;
      }
      if(!checker){
        return this.router.createUrlTree(['/access_denied']);
      }
      return checker;
    }
}

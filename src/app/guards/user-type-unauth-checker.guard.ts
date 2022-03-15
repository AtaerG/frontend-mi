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
      let checker = true;
      let token = sessionStorage.getItem('token');
      console.log(token)
      checker = true;
      if(token != null) {
        checker = false;
        return this.router.createUrlTree(['/access_denied']);
      }
      return true;
    }
}

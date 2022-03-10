import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeAuthCheckerGuard implements CanActivate {
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
        checker = true;
      }
      if(!checker){
        this.router.navigate(['/access_denied']).then(() => {
          window.location.reload();
        });
      }
      return checker;
    }
}

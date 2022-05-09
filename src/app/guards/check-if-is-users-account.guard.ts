import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckIfIsUsersAccountGuard implements CanActivate {
  constructor(private router: Router, private userService:UserService) {}
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
      this.userService.getUser(id).subscribe({
        next: (res: any) => {
          data = res;
        },
        error: () => {
          this.router.navigate(['/access_denied']);
        },
        complete: () =>{
          console.log(data);
          if (data.id === user_id) {
            console.log('access denied');
            observer.next(true);
          } else {
            console.log('access denied');
            this.router.navigate(['/access_denied']);
          }
        }
      }
      );
   });
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOrderIsUserOrAdminGuard implements CanActivate {
  constructor(private router: Router, private orderService: OrderService) {}
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
        if(user_role == 'admin'){
          observer.next(true);
          return;
        }
      } else {
        this.router.navigate(['/access_denied']);
      }
      this.orderService.getOrderForCanActivate(id).subscribe({
        next: (res: any) => {
          data = res;
        },
        error: () => {
            this.router.navigate(['/access_denied']);
        },
        complete: () =>{
          console.log(data);
          if (data.order_details.user_id === user_id) {
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

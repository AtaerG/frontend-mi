import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserOrderResolver implements Resolve<Order> {

  constructor(private orderService: OrderService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.params['id'];
    return this.orderService.getUsersOrder(id);
  }
}

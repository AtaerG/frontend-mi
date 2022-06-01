import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order!: Order;

  constructor(private http: HttpClient, private productService:ProductService,private router: Router) { }

  createOrder(products:any,total_price:number,status:string, direction:string,post_code:number,city:string,state:string,country:string  ){
    return this.http.post('orders', {
      products: products,
      total_price: total_price,
      status: status,
      direction: direction,
      post_code: post_code,
      city: city,
      state: state,
      country: country
    }).pipe(
      map(product => console.log(product)),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  editOrder(id:number, direction:string,post_code:number,city:string,state:string,country:string  ){
    return this.http.put('orders/'+id, {
      direction: direction,
      post_code: post_code,
      city: city,
      state: state,
      country: country
    }).pipe(
      map(product => console.log(product)),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getOrderForCanActivate(id:number): Observable<any> {
    return this.http.get<any>('orders/'+id).pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }


  getOrder(id:number): Observable<any> {
    return this.http.get<Order>('orders/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getAllOrders(): Observable<any> {
    return this.http.get<Order[]>('orders').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getUsersOrder(user_id:number): Observable<any> {
    return this.http.post('orders/user', {
      user_id: user_id,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  deleteOrder(id:number): Observable<any> {
    return this.http.delete('orders/'+id).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    )
  }

  updateStatusOrder(id:number,status:string): Observable<any> {
    return this.http.patch('status/orders/'+id, {
      status: status,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  updateValorationOrder(id:number,valoration:number): Observable<any> {
    return this.http.patch('valoration/orders/'+id, {
      valoration: valoration,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }
}

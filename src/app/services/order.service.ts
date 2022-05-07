import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order!: Order;

  constructor(private http: HttpClient, private productService:ProductService) { }

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
      catchError((resp) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}. ${resp}`)))
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
      catchError((resp) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}. ${resp}`)))
    );
  }



  getOrder(id:number): Observable<Order> {
    return this.http.get<Order>('orders/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de mostrar el pedido. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('orders').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de obtener pedido. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getUsersOrder(user_id:number): Observable<any> {
    return this.http.post('orders/user', {
      user_id: user_id,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  deleteOrder(id:number): Observable<any> {
    return this.http.delete('orders/'+id).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de eliminar pedido Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  updateStatusOrder(id:number,status:string): Observable<any> {
    return this.http.patch('status/orders/'+id, {
      status: status,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  updateValorationOrder(id:number,valoration:number): Observable<any> {
    return this.http.patch('valoration/orders/'+id, {
      valoration: valoration,
    }).pipe(
      map(orders=> {return orders}),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }
}

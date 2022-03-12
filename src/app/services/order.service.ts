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

  productAddedToOrder(product: Product): Observable<any>{
    let new_amount = product.amount - 1;
    console.log(product.amount);
    return this.http.patch(`products/${product.id}`,{
      amount : new_amount
    }).pipe(
      tap(() => {
        this.order.products.push(product);
        sessionStorage.removeItem('products');
        sessionStorage.setItem('products', JSON.stringify(this.order.products));
      }),
      catchError((resp: HttpErrorResponse) => throwError(() => new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  productRemovedFromOrder(product: Product): Observable<any> {
    product.amount += 1;
    return this.http.patch('products/',product).pipe(
      tap(() => {
        this.order.products = this.order.products.filter((el) => {
          return el != product;
        });
        sessionStorage.removeItem('products');
        sessionStorage.setItem('products', JSON.stringify(this.order.products));
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  createOrder(products:string,total_price:number,status:string, direction:string,post_code:number,city:string,state:string,country:string  ){
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
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
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
}

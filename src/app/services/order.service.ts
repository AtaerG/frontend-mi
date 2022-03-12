import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order ={
    products_id: [],
    total_prcie: 0,
    address: {
      direction: '',
      post_code: 0,
      city: '',
      state: '',
      country: '',
    }
  };

  constructor(private http: HttpClient, private productService:ProductService) { }

  productAddedToOrder(product: Product): Observable<any>{
    let new_amount = product.amount - 1;
    console.log(product.amount);
    return this.http.patch(`products/${product.id}`,{
      amount : new_amount
    }).pipe(
      tap(() => {
        this.order.products_id.push(product.id);
        sessionStorage.removeItem('products');
        sessionStorage.setItem('products', JSON.stringify(this.order.products_id));
      }),
      catchError((resp: HttpErrorResponse) => throwError(() => new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  productRemovedFromOrder(product: Product): Observable<any> {
    product.amount += 1;
    return this.http.patch('products/',product).pipe(
      tap(() => {
        this.order.products_id = this.order.products_id.filter((el) => {
          return el != product.id;
        });
        sessionStorage.removeItem('products');
        sessionStorage.setItem('products', JSON.stringify(this.order.products_id));
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  createOrder(token:any){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)['token'].accessToken}`
    });
    console.log(headers.get('Authorization'));
    return this.http.post('order',{
      headers:headers
    })
  }
}

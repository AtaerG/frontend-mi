import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(name:string, price:number, description: string, amount:number, image_url:string, tag:string, visible:string){
    return this.http.post('products',{
      name: name,
      price: price,
      description: description,
      amount: amount,
      image_url: image_url,
      tag:tag,
      visible: visible
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>('products/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  deleteProduct(id:number, visible:string) {
    return this.http.patch('products/'+id, {
      visible: visible,
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  deleteComment(id:number){
    return this.http.delete('comments/'+id).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  editProduct(id:number,name:string, price:number, description: string, amount:number, image_url:string, tag:string, visible:string){
    return this.http.put('products/'+id,{
      name: name,
      price: price,
      description: description,
      amount: amount,
      image_url: image_url,
      tag:tag,
      visible:visible
    }).pipe(
      map((re)=> console.log(re)),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getProductAmount(id:number){
    return this.http.get('products/amount/'+id).pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

}

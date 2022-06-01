import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router ) { }

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
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getProduct(id:number): Observable<any> {
    return this.http.get<Product>('products/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>('products').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  deleteProduct(id:number, visible:string) {
    return this.http.patch('products/'+id, {
      visible: visible,
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    )
  }

  deleteComment(id:number){
    return this.http.delete('comments/'+id).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
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
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getProductAmount(id:number){
    return this.http.get('products/amount/'+id).pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private router:Router) { }

  getAllComments(): Observable<any> {
    return this.http.get<Comment[]>('comments').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  saveComment(order_id:number,content:string, valoration:number, user_id:number, product_id:number) {
    return this.http.post('comments',{
      order_id: order_id,
      content: content,
      valoration: valoration,
      user_id: user_id,
      product_id: product_id
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

}

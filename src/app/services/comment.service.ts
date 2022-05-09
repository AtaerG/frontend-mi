import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('comments').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
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
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

}

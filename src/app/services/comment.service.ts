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

}

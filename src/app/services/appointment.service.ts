import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private router:Router) { }

  createAppointment(user_id:number, admin_id:number, date:string, time:string): Observable<any> {
    return this.http.post('appointments', {
      user_id: user_id,
      admin_id: admin_id,
      date: date,
      time: time
    }).pipe(
      catchError((resp: HttpErrorResponse) => throwError(() => new Error(`Error a la hora registrar usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }
}

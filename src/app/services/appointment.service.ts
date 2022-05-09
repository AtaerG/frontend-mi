import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private router:Router) { }

  createAppointment(user_id:number, admin_id:any, date:string, time:string): Observable<any> {
    return this.http.post('appointments', {
      user_id: user_id,
      admin_id: admin_id,
      date: date,
      time: time
    }).pipe(
      map(res => res),
      catchError((resp: HttpErrorResponse) => throwError(() => new Error(`Error a la hora crear cita. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  deleteAppointment(id:number) {
    return this.http.delete('appointments/'+id).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de eliminar cita. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  getAdminsAppointmentsWithDateTime(admin_id:any, date:string, time:string): Observable<any> {
    return this.http.post('appt-admin-dt', {
      admin_id: admin_id,
      date: date,
      time: time
    }).pipe(
      map(res => res),
      catchError((resp:any) => resp)
    );
  }
}

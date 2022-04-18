import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('users').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>('users-admins').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  getUser(id:number): Observable<User> {
    return this.http.get<User>('users/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  editUser(id:number,name:string, surname:number, email: string, password:string, role:string){
    return this.http.put('users/'+id,{
      name: name,
      surname: surname,
      email: email,
      password: password,
      role:role
    }).pipe(
      map((re)=> console.log(re)),
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  deleteUserAccount(id: number){
    return this.http.delete('users/'+id).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de eliminar la cuenta de usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  getAllAppointmentsOfUser(user_id:number): Observable<any> {
    return this.http.post('appt-user',{
      user_id: user_id
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de eliminar la cuenta de usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

  getAllAppointmentsOfAdmin(admin_id:number): Observable<any> {
    return this.http.post('appt-admin',{
      admin_id: admin_id
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error a la hora de eliminar la cuenta de usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    )
  }

}

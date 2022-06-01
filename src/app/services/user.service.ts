import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService:AuthService, private router:Router) { }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>('users').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getAllAdmins(): Observable<any> {
    return this.http.get<User[]>('users-admins').pipe(
      map((response) => {
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  getUser(id:number): Observable<any> {
    return this.http.get<User>('users/'+id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  editUser(id:number,name:string, surname:number, email: string, role:string){
    return this.http.put('users/'+id,{
      name: name,
      surname: surname,
      email: email,
      role:role
    }).pipe(
      map((re)=> console.log(re)),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  deleteUserAccount(id: number, token: string) {
    return this.http.delete('users/'+id).pipe(
      tap(
        ()=> {
          this.authService.logout(token).subscribe({
            next: () =>  {
              alert('La cuenta esta eliminada con exito!');
            },
          });
        }),
        catchError((resp: any) =>{
          return this.router.navigate(['/error_page']);
        })
    )
  }

  getAllAppointmentsOfUser(user_id:number): Observable<any> {
    return this.http.post('appt-user',{
      user_id: user_id
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    )
  }

  getAllAppointmentsOfAdmin(admin_id:number): Observable<any> {
    return this.http.post('appt-admin',{
      admin_id: admin_id
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    )
  }

}

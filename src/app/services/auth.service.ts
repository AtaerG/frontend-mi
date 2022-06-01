import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }


  register(name:string, surname:string, email: string, password:  string, token_recapV3: string){
    return this.http.post('register',{
      name: name,
      surname: surname,
      email: email,
      password: password,
      token_recapV3: token_recapV3
    }).pipe(
      map(()=>{
        alert('La cuenta se ha creado con éxito');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }),
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  login(email: string, password:  string, token_recapV3: string) {
    return this.http.post('login', {
      email: email,
      password: password,
      token_recapV3: token_recapV3
    }).pipe(
      map((token:any)=>{
      console.log(token);
       return token;
      }),
      catchError((resp: any) => {
        return this.router.navigate(['/error_page']);
      })
    );
  }

  logout(token:string){
    console.log(JSON.parse(token)['token'].accessToken);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)['token'].accessToken}`
    });
    return this.http.get('logout',{
      headers:headers
    })
  }

  getPasswordChangeToken(email:string){
    return this.http.post('password/forgot', {
      email: email
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }

  changePassword(token:string, password:string,password_confirm:string){
    return this.http.post('password/reset', {
      token: token,
      password:password,
      password_confirm:password_confirm
    }).pipe(
      catchError((resp: any) =>{
        return this.router.navigate(['/error_page']);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  register(name:string, surname:string, email: string, password:  string, token_recapV3: string){
    return this.http.post('register',{
      name: name,
      surname: surname,
      email: email,
      password: password,
      token_recapV3: token_recapV3
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  login(email: string, password:  string, token_recapV3: string) {
    return this.http.post('login', {
      email: email,
      password: password,
      token_recapV3: token_recapV3
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  logout(token:string){
    console.log(JSON.parse(token)['token'].accessToken);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)['token'].accessToken}`
    });
    console.log(headers.get('Authorization'));
    return this.http.get('logout',{
      headers:headers
    })
  }

  getPasswordChangeToken(email:string){
    return this.http.post('password/forgot', {
      email: email
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }

  changePassword(token:string, password:string,password_confirm:string){
    return this.http.post('password/reset', {
      token: token,
      password:password,
      password_confirm:password_confirm
    }).pipe(
      catchError((resp: HttpErrorResponse) =>
      throwError(()=> new Error(`Error. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`)))
    );
  }
}

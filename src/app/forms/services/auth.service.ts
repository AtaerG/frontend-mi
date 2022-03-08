import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signed:boolean = false;
  constructor(private http: HttpClient) { }


  register(email: string, password:  string){
    return this.http.post('register',{
      email: email,
      password: password
    })
  }

  login(email: string, password:  string) {
    return this.http.post('login', {
      email: email,
      password: password
    })
  }

  logout(token:any){
    console.log(JSON.parse(token)[0].accessToken);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(token)[0].accessToken}`
    });
    console.log(headers.get('Authorization'));
    return this.http.get('logout',{
      headers:headers
    });
  }

}

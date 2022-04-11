import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import Pusher from 'pusher-js';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  pusher!: Pusher;
  message!: Message;
  connected_users!: number[];
  constructor(private http: HttpClient, private userService: UserService) { }

  connect(token: string) {
    const pusher = new Pusher('5f37736952b69994f8c1', {
      authEndpoint: `${ environment.baseUrl }/broadcasting/auth`,
      cluster: 'eu',
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ token }`
        }
      },
    });
    return pusher;
  }

  sendMessage(user_id:number, message: string, token:string) {
    const url = "messages";
    const headers = new HttpHeaders({
      Authorization: `Bearer ${ sessionStorage.getItem('token') }`
    });
    return this.http.post(url, {
      user_id: user_id,
      message: message,
    }, {headers});
  }
}


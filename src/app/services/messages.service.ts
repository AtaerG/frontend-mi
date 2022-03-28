import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Pusher from 'pusher-js';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  pusher!:Pusher;
  message!:Message;
  connected_users!:number[];
  constructor(private http: HttpClient, private userService: UserService) {}

  connect(user_id:number, token:string){
    const pusher = new Pusher('5f37736952b69994f8c1', {
      authEndpoint: '/broadcasting/auth',
      cluster: 'eu',
      auth: {
        headers: {
          Authorization: "Bearer " + JSON.parse(token)['token']['accessToken'],
        }
      }
    });
    let channel = pusher.subscribe('chat.'+user_id);
    this.connected_users.push(user_id);
    return channel;
  }

  closeConnection(){

  }

  getConnectedUsers(){
    return this.connected_users;
  }
}

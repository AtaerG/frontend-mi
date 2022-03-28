import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Pusher from 'pusher-js';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  pusher!:Pusher;
  message!:Message;
  messages: Message[] = [];
  constructor(private http: HttpClient) {}

  connect(){
    this.pusher = new Pusher('5f37736952b69994f8c1', {
      cluster: 'eu'
    });
    let channel = this.pusher.subscribe('chat');
    channel.bind('chat-event', (data:any) =>  this.messages.push(data));
  }
}

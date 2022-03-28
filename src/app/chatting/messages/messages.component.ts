import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Pusher from 'pusher-js';
import { Message } from 'src/app/interfaces/message';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  status: string | null = sessionStorage.getItem('token');
  token: string = "";
  user_id: number = 0;
  message!:Message | null;
  messages:Message[] = [];
  channel!:any;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      console.log(this.user_id);
      this.token = this.status;
    }
    Pusher.logToConsole = true;
    let token = sessionStorage.getItem('token');
    if (token != null) {

      const pusher = new Pusher('5f37736952b69994f8c1', {
        authEndpoint: "/broadcasting/auth",
        cluster: 'eu',
        auth: {
          headers: {
            Authorization: "Bearer " + JSON.parse(token)['token']['accessToken'],
          }
        }
      });
      this.channel = pusher.subscribe('chat.1');
      this.channel.bind('chat-event', (data: Message) => {
        console.log("kshgasuiqs");
        this.messages.push(data);
        console.log(this.messages);
      });

    }
  }

  sendMessage() {
    this.http.post('messages', {
      user_id: this.user_id,
      message: this.message
    }).subscribe({
      next: () => {
        this.message = null;
      },
      error: (err) => console.log(err),
    })
  }
}







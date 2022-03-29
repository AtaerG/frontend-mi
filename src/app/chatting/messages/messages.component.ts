import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Pusher from 'pusher-js';
import { Message } from 'src/app/interfaces/message';
import Echo from 'laravel-echo';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  status: string | null = sessionStorage.getItem('token');
  token: string = "";
  user_id: number = 0;
  message!: string;
  messages: Message[] = [];
  channel!: any;
  echo!: Echo;
  user_role: string = "";

  constructor(private http: HttpClient, private messageService: MessagesService) { }


  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
      this.token = this.status;
      Pusher.logToConsole = true;
      let token = sessionStorage.getItem('token');
      console.log(token);
      if (token != null) {
        this.channel = this.messageService.connect(token);
        this.channel.subscribe("channel-chat");
        this.channel.bind('chat-event', (data: Message) => {
          console.log(data);
          this.messages.push(data);
          console.log(this.messages);
        });
      }
    }
  }


  sendMessage() {
    this.messageService.sendMessage(this.user_id,this.message, this.token).subscribe({
      next: (el) => {
        this.message = "";
      },
      error: (err) => console.log(err),
      });
    /*
    this.http.post('messages', {
      user_id: this.user_id,
      message: this.message
    }).subscribe({
      next: () => {
        this.message = "";
      },
      error: (err) => console.log(err),
    })
    */
  }

}

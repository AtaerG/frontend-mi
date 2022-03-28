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

  user_role: string = "";

  constructor(private http: HttpClient, private messageService: MessagesService) { }


  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
      console.log(this.user_id);
      this.token = this.status;
    }
    if(this.user_role != "admin"){
      Pusher.logToConsole = true;
      let token = sessionStorage.getItem('token');
      if (token != null) {
        let channel = this.messageService.connect(this.user_id, token);
        this.channel.bind('chat-event', (data: Message) => {
          console.log("kshgasuiqs");
          this.messages.push(data);
          console.log(this.messages);
        });

      }
    } else {
      let con_users = this.messageService.connected_users;
      console.log(con_users)
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







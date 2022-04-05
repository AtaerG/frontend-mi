import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Pusher, { PresenceChannel } from 'pusher-js';
import { Message } from 'src/app/interfaces/message';
import Echo from 'laravel-echo';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

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
  channel_presence!: any;
  channel_msg!: any;
  echo!: Echo;
  user_role: string = "";


  constructor(private http: HttpClient, private messageService: MessagesService) {
  }


  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
      this.token = JSON.parse(this.status).accessToken;
      Pusher.logToConsole = true;
      let token = JSON.parse(this.status)["token"].accessToken
      if (token != null) {

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

        this.channel_presence = pusher.subscribe('presence-channel.1');//+this.user_id);
        this.channel_presence.bind('pusher:subscription_succeeded', (data:any) => {
          if(this.user_role == 'admin'){
            alert('El administrador se ha conectado a la sesión');
          }
        });
        this.channel_presence.bind('my-event',(data:any) => {
            this.messages.push(data);
        });
      }
    }
  }


  sendMessage() {
    this.http.post('messages', {
      user_id: 1,
      message: this.message
    }).subscribe({
      next: () => {
        console.log(this.channel_presence.members.count);
        this.message = "";

      },
      error: (err) => console.log(err),
    })
  //}
  }

  endMessagingSession(){

  }

  ngOnDestroy(): void {
    //this.pusher.unsubscribe('presence-channel.1');
  }
}

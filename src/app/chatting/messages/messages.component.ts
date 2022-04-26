import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import Pusher, { PresenceChannel } from 'pusher-js';
import { Message } from 'src/app/interfaces/message';
import Echo from 'laravel-echo';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  status: string | null = sessionStorage.getItem('token');
  token: string = "";
  user_id: number = 0;
  name:string = "";
  message!: string;
  messages: Message[] = [];
  channel_presence!: any;
  channel_msg!: any;
  echo!: Echo;
  user_role: string = "";
  id_chat:any;


  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  ngOnInit(): void {
    if (this.status != null) {
      this.user_id = JSON.parse(this.status).user_id;
      this.user_role = JSON.parse(this.status).user_role;
      this.name = JSON.parse(this.status).name;
      this.token = JSON.parse(this.status).accessToken;
      Pusher.logToConsole = true;
      this.id_chat = this.route.snapshot.paramMap.get('id');
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
        this.channel_presence = pusher.subscribe('presence-channel.'+this.id_chat);
        this.channel_presence.bind('my-event',(data:any) => {
            this.messages.push(data);
        });
      }
    }
  }


  sendMessage() {
    if(this.channel_presence.members.count < 2){
      if(this.user_role == 'admin'){
        alert('No hay usuario conectado');
      } else {
        alert('Admin no esta conectado a la sesion, por favor espere!');
      }
    } else {
      if(this.id_chat > 0){
        this.http.post('messages', {
          id: this.id_chat,
          name: this.name,
          message: this.message
        }).subscribe({
          next: () => {
            console.log(this.channel_presence.members.count);
            this.message = "";
          },
          error: (err) => console.log(err),
        })
      } else  {
        alert("Error! No se pudo enviar el mensaje");
      }
    }
  }

  ngOnDestroy(): void {
    this.channel_presence.unsubscribe();
  }
}

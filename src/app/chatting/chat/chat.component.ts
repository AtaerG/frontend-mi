import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages:Message[] =[];
  message: string ="";
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(){

  }

}

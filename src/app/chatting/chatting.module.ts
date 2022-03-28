import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ProductsRoutingModule } from './chatting-routing.module';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    MessagesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ChattingModule { }

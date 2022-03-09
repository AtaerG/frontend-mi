import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ProductsRoutingModule } from './chatting-routing.module';



@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ChattingModule { }

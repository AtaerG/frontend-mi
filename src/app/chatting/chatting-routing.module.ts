import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAdminsResolver } from '../resolvers/all-admins.resolver';
import { ApplyChatComponent } from './apply-chat/apply-chat.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent},
  { path: 'apply', component: ApplyChatComponent, resolve: {
    admins: AllAdminsResolver
  }},
  { path: 'messages/:id', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

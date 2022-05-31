import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessToMsgGuard } from '../guards/access-to-msg.guard';
import { UserCheckIdAppointmentGuard } from '../guards/user-check-id-appointment.guard';
import { UserTypeAuthCheckerGuard } from '../guards/user-type-auth-checker.guard';
import { UserTypeNormalGuard } from '../guards/user-type-normal.guard';
import { AllAdminsResolver } from '../resolvers/all-admins.resolver';
import { ApplyChatComponent } from './apply-chat/apply-chat.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent,  canActivate: [UserTypeAuthCheckerGuard]},
  { path: 'apply', component: ApplyChatComponent, resolve: {
    admins: AllAdminsResolver
  },  canActivate: [UserTypeNormalGuard]},
  { path: 'messages/:id', component: MessagesComponent,  canActivate: [UserCheckIdAppointmentGuard, AccessToMsgGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

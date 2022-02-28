import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { DelUserComponent } from './del-user/del-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { ListUsersComponent } from './list-users/list-users.component';



@NgModule({
  declarations: [
    AddUserComponent,
    DelUserComponent,
    ShowUserComponent,
    ModUserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }

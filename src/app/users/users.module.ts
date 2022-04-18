import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowUserComponent } from './show-user/show-user.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ShowUserComponent,
    ModUserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    NgChartsModule
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserFormsRoutingModule } from './user-forms-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ShippingDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserFormsRoutingModule
  ],
})
export class UserFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ShippingDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormsModule { }

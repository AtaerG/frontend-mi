import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderComponent } from './list-order/list-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from '../products/products-routing.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';
import { AuthCheckInterceptor } from '../interceptors/auth-check.interceptor';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFindPipe } from '../pipes/order-find.pipe';


@NgModule({
  declarations: [
    ListOrderComponent,
    AddOrderComponent,
    ShowOrderComponent,
    EditOrderComponent,
    OrderFindPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthCheckInterceptor,
      multi:true
    }
  ],
})
export class OrdersModule { }

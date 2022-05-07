import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserFormsRoutingModule } from './forms/user-forms-routing.module';
import { UserFormModule } from './forms/user-forms.module';
import { ProductsRoutingModule } from './products/products-routing.module';
import { ProductsModule } from './products/products.module';
import { ChattingModule } from './chatting/chatting.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { DefaultPagesModule } from './default-pages/default-pages.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RecaptchaV3Module,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserFormModule,
    ProductsModule,
    ChattingModule,
    OrdersModule,
    UsersModule,
    DefaultPagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor ,
      multi:true
    },
    { provide: RECAPTCHA_V3_SITE_KEY, /*desarollo useValue: '6Le7t7sfAAAAAA4OIXhlEPZ-vQks9H5_R0R8AJAY'*//*local host:*/ useValue: '6LcPr0keAAAAANPLsWmn0RMC5UuP1pWMDN1dcQta' },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

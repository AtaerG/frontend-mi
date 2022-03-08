import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserFormsRoutingModule } from './forms/user-forms-routing.module';
import { UserFormModule } from './forms/user-forms.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserFormModule,
    UserFormsRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

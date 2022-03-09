import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DefaultPagesRoutingModule } from './default-pages.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DefaultPagesRoutingModule
  ]
})
export class DefaultPagesModule { }

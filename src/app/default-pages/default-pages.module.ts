import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DefaultPagesRoutingModule } from './default-pages.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../directives/hover.directive';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    AccessDeniedComponent,
    HomepageComponent,
    HoverDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DefaultPagesRoutingModule
  ]
})
export class DefaultPagesModule { }

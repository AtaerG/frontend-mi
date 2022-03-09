import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product/show-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FindProductComponent } from './find-product/find-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShowProductComponent,
    ListProductsComponent,
    FindProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ProductsRoutingModule
  ],
})
export class ProductsModule { }

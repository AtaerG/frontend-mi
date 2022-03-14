import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product/show-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';
import { ProductsRoutingModule } from './products-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthCheckInterceptor } from '../interceptors/auth-check.interceptor';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductFindPipe } from '../pipes/product-find.pipe';
import { ListCommentsComponent } from './list-comments/list-comments.component';



@NgModule({
  declarations: [
    ShowProductComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ListCommentsComponent,
    ProductFindPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule
  ],
  /*
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthCheckInterceptor ,
      multi:true
    }
  ],
  */
})
export class ProductsModule { }

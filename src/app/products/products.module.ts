import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowProductComponent } from './show-product/show-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FindProductsComponent } from './find-products/find-products.component';
import { FindProductComponent } from './find-product/find-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DelProductComponent } from './del-product/del-product.component';



@NgModule({
  declarations: [
    ShowProductComponent,
    ListProductsComponent,
    FindProductsComponent,
    FindProductComponent,
    AddProductComponent,
    DelProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }

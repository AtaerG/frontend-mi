import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProductComponent } from './show-product/show-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FindProductComponent } from './find-product/find-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserTypeAdminCheckerGuard } from '../guards/user-type-admin-checker.guard';

const routes: Routes = [
  { path: 'products', component: ListProductsComponent },
  { path: 'products/create', component: AddProductComponent, canActivate: [UserTypeAdminCheckerGuard],  },
  { path: 'products/:id', component: ShowProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

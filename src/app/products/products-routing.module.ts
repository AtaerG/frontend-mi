import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProductComponent } from './show-product/show-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FindProductComponent } from './find-product/find-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserTypeAdminCheckerGuard } from '../guards/user-type-admin-checker.guard';
import { ProductGetResolver } from '../resolvers/product-get.resolver';
import { AllProductsResolver } from '../resolvers/all-products.resolver';

const routes: Routes = [
  { path: 'products', component: ListProductsComponent,
  resolve: {
    products: AllProductsResolver
  } },
  { path: 'products/create', component: AddProductComponent},//, canActivate: [UserTypeAdminCheckerGuard]  },
  { path: 'products/:id', component: ShowProductComponent,
    resolve: {
      product: ProductGetResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

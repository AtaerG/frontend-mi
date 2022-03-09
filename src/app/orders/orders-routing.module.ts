import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOrderComponent } from './list-order/list-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { FindOrderComponent } from './find-order/find-order.component';
import { ShowOrderComponent } from './show-order/show-order.component';

const routes: Routes = [
  { path: 'orders', component: ListOrderComponent },
  { path: 'orders/:id', component: ShowOrderComponent },
  { path: 'orders/create', component: AddOrderComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

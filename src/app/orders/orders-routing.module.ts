import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOrderComponent } from './list-order/list-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { OrderGetResolver } from '../resolvers/order-get.resolver';
import { AllOrdersResolver } from '../resolvers/all-orders.resolver';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  { path: 'orders', component: ListOrderComponent,
  resolve: {
    orders: AllOrdersResolver
  } },
  { path: 'orders/create', component: AddOrderComponent  },
  { path: 'orders/:id', component: ShowOrderComponent,
    resolve: {
      order: OrderGetResolver
    }
  },
  { path: 'orders/edit/:id', component: EditOrderComponent,
    resolve: {
      order: OrderGetResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOrderComponent } from './list-order/list-order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { OrderGetResolver } from '../resolvers/order-get.resolver';
import { AllOrdersResolver } from '../resolvers/all-orders.resolver';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { UserTypeAuthCheckerGuard } from '../guards/user-type-auth-checker.guard';
import { UserTypeAdminCheckerGuard } from '../guards/user-type-admin-checker.guard';
import { UserTypeNormalGuard } from '../guards/user-type-normal.guard';
import { CheckOrderIsUserOrAdminGuard } from '../guards/check-order-is-user-or-admin.guard';
import { CheckOrderIsUsersGuard } from '../guards/check-order-is-users.guard';
import { CheckIfNormalOrUnauthGuard } from '../guards/check-if-normal-or-unauth.guard';

const routes: Routes = [
  { path: 'orders', component: ListOrderComponent, canActivate: [UserTypeAuthCheckerGuard],
  resolve: {
    orders: AllOrdersResolver
  }
},
  { path: 'orders/create', component: AddOrderComponent, canActivate: [CheckIfNormalOrUnauthGuard] },
  { path: 'orders/:id', component: ShowOrderComponent,  canActivate: [CheckOrderIsUserOrAdminGuard],
    resolve: {
      order: OrderGetResolver
    }
  },
  { path: 'orders/edit/:id', component: EditOrderComponent, canActivate: [CheckOrderIsUsersGuard],
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

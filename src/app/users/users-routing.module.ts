import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowUserComponent } from './show-user/show-user.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AllUsersResolver } from '../resolvers/all-users.resolver';
import { UserGetResolver } from '../resolvers/user-get.resolver';
import { GetUserOrderResolver } from '../resolvers/get-user-order.resolver';
import { UserTypeAdminCheckerGuard } from '../guards/user-type-admin-checker.guard';
import { UserTypeNormalGuard } from '../guards/user-type-normal.guard';
import { CheckIfIsUsersAccountOrIsAdminGuard } from '../guards/check-if-is-users-account-or-is-admin.guard';
import { CheckIfIsUsersAccountGuard } from '../guards/check-if-is-users-account.guard';

const routes: Routes = [
  { path: 'users', component: ListUsersComponent, canActivate: [UserTypeAdminCheckerGuard],
  resolve: {
    users: AllUsersResolver
  }
  },
  { path: 'users/edit/:id', component: ModUserComponent, canActivate: [CheckIfIsUsersAccountGuard],
  resolve: {
    user: UserGetResolver
  }
},
  { path: 'users/:id', component: ShowUserComponent,canActivate: [CheckIfIsUsersAccountOrIsAdminGuard],
    resolve: {
      user: UserGetResolver,
      orders: GetUserOrderResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowUserComponent } from './show-user/show-user.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AllUsersResolver } from '../resolvers/all-users.resolver';
import { UserGetResolver } from '../resolvers/user-get.resolver';

const routes: Routes = [
  { path: 'users', component: ListUsersComponent,
  resolve: {
    users: AllUsersResolver
  }
  },
  { path: 'users/:id/edit', component: ModUserComponent,
  resolve: {
    user: UserGetResolver
  }  },
  { path: 'users/:id', component: ShowUserComponent,
  resolve: {
    user: UserGetResolver
  } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelUserComponent } from './del-user/del-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ModUserComponent } from './mod-user/mod-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  { path: 'users', component: ListUsersComponent },
  { path: 'users/:id', component: ShowUserComponent },
  { path: 'users/:id/modificate', component: ModUserComponent  },
  { path: 'users/:id/delete', component: DelUserComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

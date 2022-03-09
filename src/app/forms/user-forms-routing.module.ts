import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { SaveChangesGuard } from '../guards/save-changes.guard';
import { UserTypeUnauthCheckerGuard } from '../guards/user-type-unauth-checker.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserTypeUnauthCheckerGuard] },
  { path: 'register', component: RegisterComponent, canDeactivate: [SaveChangesGuard]},
  { path: 'shipping-details', component: ShippingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormsRoutingModule { }

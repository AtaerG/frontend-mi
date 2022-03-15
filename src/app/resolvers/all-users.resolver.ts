import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllUsersResolver implements Resolve<User[]> {

  constructor(private userService: UserService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getAllUsers();
  }
}

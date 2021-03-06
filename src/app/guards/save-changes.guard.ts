import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
export interface ComponentDeactivate {
  canDeactivate: () => boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}

@Injectable({
  providedIn: 'root'
})
export class SaveChangesGuard implements CanDeactivate<ComponentDeactivate> {
  canDeactivate(
    component: ComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean|UrlTree| Observable<boolean | UrlTree>| Promise<boolean |UrlTree> {
    return component.canDeactivate();
  }

}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(environment.baseUrl);
    console.log(req.url);
    const reqClone = req.clone({
      headers: req.headers.set('Content-Type','application/json'),
      url: `${environment.baseUrl}/${req.url}`
    });
    console.log(reqClone);
    return next.handle(reqClone);
  }
}

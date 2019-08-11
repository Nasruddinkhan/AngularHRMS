import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { LoginService } from '../service/login.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(LoginService);
    let tokenizedReq;
    if(authService.loggedIn()){
      req = req.clone({headers: req.headers.set('Authorization', 'Token '+authService.getToken())})
    //alert("header :::::::::: "+req)
    }
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
    return next.handle(req)
  }
}
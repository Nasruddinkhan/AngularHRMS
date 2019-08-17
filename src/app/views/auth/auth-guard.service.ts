import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
/**
 * Created By, Nasruddin Khan
 * Created Date Aug 17, 2019 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
    private authenticationService: LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.loggedIn();
    if (currentUser) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
   // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
   this.router.navigate(['/']);
    return false;
}
}

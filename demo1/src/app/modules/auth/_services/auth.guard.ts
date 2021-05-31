import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router,private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    // check if route is restricted by role
   if(route.data.roles && !this.authService.showmenus(route.data.roles[0]))
   {
     // role not authorised so redirect to home page
    this.router.navigate(['/']);
   }

    const token = localStorage.getItem("access_token");
    if(token && !this.jwtHelper.isTokenExpired(token)){
        return true
    }

    this.router.navigate((["/auth/login"]));
    return false;
}

}

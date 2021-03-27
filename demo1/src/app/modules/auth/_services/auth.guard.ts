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

  canActivate(){
    const token = localStorage.getItem("access_token");
    if(token && !this.jwtHelper.isTokenExpired(token)){
        return true
    }
    this.router.navigate((["/auth/login"]));
    return false;
}

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from "./service/global.service";
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private globalService: GlobalService, private router: Router) { this.env = environment; }
  env = {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.globalService.getToken() == null) {
    //   this.router.navigate(['/login']);
    // }
    if(this.env["isAuthenticated"]){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    // return true;
  }

}

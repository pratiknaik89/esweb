import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable ,  Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { UserModel } from './../intefaces/userModel';
import { MenuService } from './menu.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private _router: Router, private global: GlobalService, private menuservice: MenuService) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.checkFun(route, state);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.checkFun(route, state);
  }

  public canLoad() {
    return true;
  }

  private checkFun(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   
    const that = this;
    const routeconfig = route.data;
    const checks = that.checkCredentials();
    console.log('state')
    
    this.global.setCurrentMenu(route.data.code);

    return Observable.create((observer: Subject<boolean>) => {

      if (checks.status) {

        observer.next(true);

      }
      else {
        that._router.navigate(['/login']);
        observer.next(true);
      }
    });
  }



  public checkCredentials(): any {
 
    const usr: UserModel = this.global.getUser();
    if (Object.keys(usr).length) { // check user is locally present in memory
      return { 'status': true };
    }else{
      return { 'status': false };
    }

  }


}

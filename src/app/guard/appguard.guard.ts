import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CompanyService } from '../service/company.service';
import { GlobalService } from '../service/global.service';
@Injectable({ providedIn: 'root' })
export class AppguardGuard implements CanActivate, CanLoad {
  constructor(private _router: Router, private checkService: CompanyService, private global: GlobalService) {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkFun(route, state);
  }

  public canLoad() {
    return true;
  }

  private checkFun(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const that = this;
    return Observable.create((observer: Subject<boolean>) => {
      this.checkService.getCompany({
        'operate': 'getEnvData'
      }).subscribe((res: any) => {
        if (res.resultKey == 1) {
          let data = res.resultValue;
          that.global.setDomainEnvData({
            doc_path: data.docurl,
            cloudinary_url: data.imageurl
          });
          observer.next(true);
        }
      })
    }, (ex) => {
      if (ex.error == 'Wrong token provided') {
        //  this.global.clearUser();
        this._router.navigateByUrl('/login');

      }
    });


  }
}

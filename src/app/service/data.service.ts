import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from '../service/global.service'
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigModel } from '../intefaces/configModel';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions: object;
  config: ConfigModel;
  //headerJson: HttpHeaders;
  myParams: HttpParams;
  httpReqestCount: number = 0;
  constructor(private http: HttpClient,
    private globalService: GlobalService,private rounter: Router) {
  this.config = globalService.getConfig();
  }

  setHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'access-token': window.localStorage.getItem("token") || ""
    });
  }

  get(url: string, objParams: object): any {
    this.myParams = new HttpParams();
    for (let key in objParams) {
      this.myParams = this.myParams.set(key, objParams[key]);
    }
    const options = { params: this.myParams, headers: this.setHeader() };
    this.httpReqestCount = this.httpReqestCount + 1;
    return this.http.get(url, options).pipe(
      map((data: any) => {
        if (data.resultKey == 0 && data.resultValue == "Invalid token") {
          // this.globalService.logout();
          // this.globalService.notifyError("Your token has expired, Please re-login.");
        }
        return data;
      })).pipe((data) => {
        this.httpReqestCount = this.httpReqestCount - 1;
        return data;
      });
  }

  post(url: string, objParams: object): any {
    this.httpReqestCount = this.httpReqestCount + 1;
    return this.http.post(url, objParams, { headers: this.setHeader() }).pipe(map((data: any) => {
      // if (data.resultKey == 0 && data.resultValue == "Invalid token") {
      //   this.globalService.logout();
      //   this.globalService.notifyError("Your token has expired, Please re-login.");
      // }
      return data;
    })).pipe((data) => {
      this.httpReqestCount = this.httpReqestCount - 1;
      return data;
    });
  }

  put(url: string, objParams: object): any {
    this.httpReqestCount = this.httpReqestCount + 1;
    return this.http.put(url, objParams, { headers: this.setHeader() }).pipe(map((data: any) => {
      if (data.resultKey == 0 && data.resultValue == "Invalid token") {
        // this.globalService.logout();
        // this.globalService.notifyError("Your token has expired, Please re-login.");
      }
      return data;
    })).pipe((data) => {
      this.httpReqestCount = this.httpReqestCount - 1;
      return data;
    });
  }
public postHttpData(reqURL: string, objData: any) {
  
    let t = (new Date().getTime());
    //this.globalService.loader = true;
    let token = '';
    if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null) {
        token = JSON.parse(localStorage.getItem('user'))['token'];
    }
    this.httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    };
    return this.http.post(this.config.api_root + reqURL, objData, this.httpOptions).pipe(finalize(() => {
      // console.log('loaded');
     
  }));
    //return this.http.post(this.config.api_root + reqURL + '?t=' + t, objData, this.httpOptions).pipe(finalize(() => {
    //     objData.userid=this.globalService.getUser().id;
    //     objData.usertype=this.globalService.getUser().usertype;
    //     objData.isregional=(this.globalService.getUser().isregional=='' || this.globalService.getUser().isregional==null)?0:this.globalService.getUser().isregional;
    // return this.http.post(this.config.api_root + reqURL, objData, this.httpOptions).pipe(finalize(() => {
    //     // console.log('loaded');
    //     this.globalService.loader = false;

    // }));
}
// public getHttpData(reqURL: string, objData: any) {
//   if (localStorage.getItem('user') == null) {
//       const defaultObservable = new Observable(observer => {
//           setTimeout(() => {
//               observer.next({
//                   resultKey: 0
//               });
//           }, 100);
//    });
//    return defaultObservable;
//   }
//   // this.globalService.loader = true;
//   let token = '';
//   if (localStorage.getItem('user') !== undefined) {
//       token = JSON.parse(localStorage.getItem('user'))['token'];
//   }
//   this.httpOptions = {
//       headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + token
//       })
//   };
//   if (objData === undefined) {
//       objData = {};
//   }
//   //objData.t = (new Date().getTime());
//   // objData.userid=this.globalService.getUser().id;
//   // objData.usertype=this.globalService.getUser().usertype;
//   // objData.isregional=(this.globalService.getUser().isregional=='' || this.globalService.getUser().isregional==null)?0:this.globalService.getUser().isregional;
//    const params = $.param(objData);

//   return this.http.get(this.config.api_root + reqURL + '?' + params, this.httpOptions).pipe(finalize(() => {
//       // console.log('loaded');

//       // this.globalService.loader = false;
//   }));
// }

public getHttpData(reqURL: string, objData: any) {

  // if (localStorage.getItem('user') == null) {
  //     const defaultObservable = new Observable(observer => {
  //         setTimeout(() => {
  //             observer.next({
  //                 resultKey: 0
  //             });
  //         }, 100);
  //     });
  //     this.rounter.navigate(['/login']);
  //     return defaultObservable;
  // }
  this.globalService.loader = true;
  let token = '';
  if (localStorage.getItem('user') !== undefined && localStorage.getItem('user')!=null) {
      token = JSON.parse(localStorage.getItem('user'))['token'];
  }
  this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      })
  };
  if (objData === undefined) {
      objData = {};
  }
  //objData.t = (new Date().getTime());
  objData.userid = this.globalService.getUser().id;
  objData.cmp = this.globalService.getCompany();
  objData.dispensary = this.globalService.getDisp();
  const params = $.param(objData);
  const cmp = this.globalService.getCompany();

  return this.http.get(this.config.api_root + '/company(' + cmp + ')' + reqURL + '?' + params, this.httpOptions)
      .pipe(map((x: any) => {
          if (x && x.errorCode && x.errorCode == 401) {
              this.globalService.clearUser();
              this.rounter.navigate(['/login']);
              x.resultKey = 0
              return x;
          }

          return x;

      }))
      .pipe(finalize(() => {
          // console.log('loaded');

          this.globalService.loader = false;
      }));
}
}

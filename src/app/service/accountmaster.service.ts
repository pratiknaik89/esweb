import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { environment } from "../../environments/environment";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { observable, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountmasterService {

  constructor(private DataService: DataService, private globalservice: GlobalService) { }

  get(param: Object): Observable<any> {
    return this.DataService.get(`${environment.api_root}/accountmaster`, param)
      .pipe(map((data: any) => {
        if (data.resultKey == 1) {
          return data;
        } else {
          throw data.resultValue;
        }
      }));
  }

  post(param: Object): Observable<any> {
    return this.DataService.post(`${environment.api_root}/accountmaster`, param)
      .pipe(map((data: any) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        if (data.resultKey == 1) {
          return data;
        } else {
          throw data.resultValue;
        }
      }));
  }

  update(param: Object): Observable<any> {
    return this.DataService.put(`${environment.api_root}/accountmaster`, param)
      .pipe(map((data: any) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        if (data.resultKey == 1) {
          return data;
        } else {
          throw data.resultValue;
        }
      }));
  }
}

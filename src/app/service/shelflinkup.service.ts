import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelflinkupService {

  constructor(private dataService: DataService, private globalService: GlobalService) { }

  get(param: Object): Observable<any> {
    return this.dataService.get(`${environment.api_root}/shelflinkup`, param)
      .pipe(map((data: any) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        if (data.resultKey == 1) {
          return data;
        } else {
          throw data.resultValue;
        }
      }));
  }

  post(param: Object): Observable<any> {
    return this.dataService.post(`${environment.api_root}/shelflinkup`, param)
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
    return this.dataService.put(`${environment.api_root}/shelflinkup`, param)
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

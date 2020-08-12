import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RawItemService {

    constructor(private dataService: DataService, private globalService: GlobalService) { }

    get(param: Object): Observable<any> {
        return this.dataService.get(`${environment.api_root}/rawitem`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    post(param: Object): Observable<any> {
        return this.dataService.post(`${environment.api_root}/rawitem`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    update(param: Object): Observable<any> {
        return this.dataService.put(`${environment.api_root}/rawitem`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    getDtl(param: Object): Observable<any> {
        return this.dataService.get(`${environment.api_root}/rawitem/dtl`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    postDtl(param: Object): Observable<any> {
        return this.dataService.post(`${environment.api_root}/rawitem/dtl`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    updateDtl(param: Object): Observable<any> {
        return this.dataService.put(`${environment.api_root}/rawitem/dtl`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }

    updateDtlStatus(param: Object): Observable<any> {
        return this.dataService.put(`${environment.api_root}/rawitem/dtl/status`, param)
            .pipe(map((data: any) => {
                if (data.resultKey == 1) {
                    return data;
                } else {
                    throw data.resultValue;
                }
            }));
    }
}

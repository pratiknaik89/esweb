import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private dataservice: DataService) { }

  getTimeZone(req: any) {
    return this.dataservice.getHttpData('/getalltimezone', req);
  }

  getCurrency(req: any) {
    return this.dataservice.getHttpData('/getallcurrency', req);
  }

  getSettingByFranchiseeid(req: any) {
    return this.dataservice.getHttpData('/getsettingbyfranchiseeid', req);
  }

  saveFranchiseeSetting(req: any) {
    return this.dataservice.postHttpData('/savefranchiseesetting', req);
  }

}

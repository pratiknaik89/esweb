import { Injectable } from '@angular/core';
import { DataService } from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private dataservice: DataService) { }
  getGridconfig(req: any) {
    return this.dataservice.getHttpData('/getGridconfig', req);
  }
  postGridconfig(req: any) {
      
    return this.dataservice.postHttpData('/postGridconfig', req);
  }
  show(req: any) {
    return this.dataservice.getHttpData('/showSetting', req);
  }
}

import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { observable, Observable } from "rxjs";
import { DataService } from '../service/dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class EnvolopeService {

  constructor(private dataservice: DataService, private globalservice: GlobalService) { }

  getEnvolope(req: any) {
    return this.dataservice.getHttpData('/envolope', req);
}
SaveEnvolope(req: any) {
    return this.dataservice.postHttpData('/envolope', req);
}
bindTemplateByEnvlope(req:any){
  return this.dataservice.getHttpData('/statusview', req);
}

}



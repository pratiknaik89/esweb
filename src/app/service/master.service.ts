import { Injectable } from '@angular/core';
import {DataService} from '../service/dataservice-service';
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private dataservice: DataService, private globalservice: GlobalService) { }

  getMaster(req:any)
  {
      return this.dataservice.getHttpData('/master', req);
  }
  postMaster(req:any){
      return this.dataservice.postHttpData('/master', req);
  }

 

 
}

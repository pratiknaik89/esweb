import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private dataservice: DataService) { }

  getProperty(req: any) {
      return this.dataservice.getHttpData('/getProperty', req);
  }
  getFranchise(req: any) {
    return this.dataservice.getHttpData('/getFranchise', req);
}
  saveProperty(req: any) {
      return this.dataservice.postHttpData('/upsertProperty', req);
  }
  deleteProperty(req: any) {
      return this.dataservice.postHttpData('/upsertProperty', req);
  }
}

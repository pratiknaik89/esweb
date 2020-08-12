import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private dataservice: DataService) { }

  
  getVendor(req: any) {
    return this.dataservice.getHttpData('/getVendor', req);
}
saveVendor(req: any) {
    return this.dataservice.postHttpData('/upsertVendor', req);
}
deleteVendor(req: any) {
    return this.dataservice.postHttpData('/upsertVendor', req);
}
}

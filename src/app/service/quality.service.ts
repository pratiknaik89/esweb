import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class QualityService {

  constructor(private dataservice: DataService) { }


  getQuality(req: any) {
    return this.dataservice.getHttpData('/getQuality', req);
}
saveQuality(req: any) {
    return this.dataservice.postHttpData('/upsertQuality', req);
}
deleteQuality(req: any) {
    return this.dataservice.postHttpData('/upsertQuality', req);
}
}

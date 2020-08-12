import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private dataservice: DataService) { }


  getClass(req: any) {
    return this.dataservice.getHttpData('/getClass', req);
}
saveClass(req: any) {
    return this.dataservice.postHttpData('/upsertClass', req);
}
deleteClass(req: any) {
    return this.dataservice.postHttpData('/upsertClass', req);
}
}

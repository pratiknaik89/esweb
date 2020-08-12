import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private dataservice: DataService) { }

  getCategory(req: any) {
    return this.dataservice.getHttpData('/getCategory', req);
}
getFranchise(req: any) {
  return this.dataservice.getHttpData('/getFranchise', req);
}
saveCategory(req: any) {
    return this.dataservice.postHttpData('/upsertCategory', req);
}
deleteCategory(req: any) {
    return this.dataservice.postHttpData('/upsertCategory', req);
}


}

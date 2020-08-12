import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private dataservice: DataService) { }

  getItem(req: any) {
    return this.dataservice.getHttpData('/getItem', req);
  }
  searchItemByName(req: any) {
    return this.dataservice.getHttpData('/searchItem', req);
  }
  getItemSizeByItemId(req: any) {
    return this.dataservice.getHttpData('/itemSizeByItemId', req);
  }
  saveItem(req: any) {
    return this.dataservice.postHttpData('/upsertItem', req);
  }
  deleteItem(req: any) {
    return this.dataservice.postHttpData('/upsertItem', req);
  }
}
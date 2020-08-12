import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class SalesrecipesService {

  constructor(private dataservice: DataService) { }

  getItem(req: any) {
    return this.dataservice.getHttpData('/getItem', req);
  }
  getsalesrecipes(req: any) {
    return this.dataservice.getHttpData('/getsalesrecipes', req);
  }
  savesalesrecipes(req: any) {
    return this.dataservice.postHttpData('/upsertsalesrecipes', req);
  }
  deletesalesrecipes(req: any) {
    return this.dataservice.postHttpData('/upsertsalesrecipes', req);
  }
  getblacklistedsalesrecipes(req: any) {
    return this.dataservice.getHttpData('/getblacklistedsalesrecipes', req);
  }

  updateviewsalesblacklist(req: any) {
    return this.dataservice.postHttpData('/updateviewsalesblacklist', req);
  }

  searchItemByName(req: any) {
    return this.dataservice.getHttpData('/getitemsfordrinkmix', req);

  }

  getItemUnitByItemId(req: any) {
    return this.dataservice.getHttpData('/itemUnitByItemId', req);

  }
}

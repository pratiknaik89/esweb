import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class StocktransferService {

  constructor(private dataservice: DataService) { }

  getOutletStation(req: any) {
    return this.dataservice.getHttpData('/getOutletStation', req);
  }

  getAllStockTransfer(req: any) {
    return this.dataservice.getHttpData('/getAllStockTransfer', req);
  }

  getStockTransferItemDtl(req: any) {
    return this.dataservice.getHttpData('/getStockTransferItemDtl', req);
  }

  getItemCostByItemSize(req: any) {
    return this.dataservice.postHttpData('/getItemCostByItemSize', req);
  }

  saveStockTransferHeadDtl(req: any) {
    return this.dataservice.postHttpData('/saveStockTransferHeadDtl', req);
  }

  saveStockTransferItemDtl(req: any) {
    return this.dataservice.postHttpData('/saveStockTransferItemDtl', req);
  }

  delStockTransfer(req: any) {
    return this.dataservice.postHttpData('/delStockTransfer', req);
  }

  delStockTransferItem(req: any) {
    return this.dataservice.postHttpData('/delStockTransferItem', req);
  }
}

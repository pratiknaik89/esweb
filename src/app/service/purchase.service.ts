import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private dataservice: DataService) { }

  importPurchase(req: any) {
    return this.dataservice.postHttpData('/importpurchase', req);
  }

  getimportPurchase(req: any) {
    return this.dataservice.postHttpData('/getimportpurchase', req);
  }

  getlinkedimportedcolumn(req: any) {
    return this.dataservice.getHttpData('/getlinkedimportedcolumn', req);
  }

  checkpurchaseexists(req: any) {
    return this.dataservice.postHttpData('/checkpurchaseexists', req);
  }

  getAllInvoice(req: any) {
    return this.dataservice.getHttpData('/getAllInvoice', req);
  }

  searchVendorByName(req: any) {
    return this.dataservice.getHttpData('/searchVendorByName', req);
  }

  getInvoiceItemDtl(req: any) {
    return this.dataservice.getHttpData('/getInvoiceItemDtl', req);
  }

  getVendorMappingDtl(req: any) {
    return this.dataservice.getHttpData('/getVendorMappingDtl', req);
  }

  saveVendorMapping(req: any) {
    return this.dataservice.postHttpData('/saveVendorMapping', req);
  }

  getItemMappingDtl(req: any) {
    return this.dataservice.getHttpData('/getItemMappingDtl', req);
  }

  saveItemMapping(req: any) {
    return this.dataservice.postHttpData('/saveItemMapping', req);
  }

  saveInvoiceHeadDtl(req: any) {
    return this.dataservice.postHttpData('/saveInvoiceHeadDtl', req);
  }

  saveInvoiceItemDtl(req: any) {
    return this.dataservice.postHttpData('/saveInvoiceItemDtl', req);
  }

  delInvoice(req: any) {
    return this.dataservice.postHttpData('/delInvoice', req);
  }

  delInvoiceItem(req: any) {
    return this.dataservice.postHttpData('/delInvoiceItem', req);
  }

}

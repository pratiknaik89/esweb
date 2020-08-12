import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class SalesimportService {

  constructor(private dataservice: DataService) { }

  importSalesData(req: any) {
    return this.dataservice.postHttpData('/upsertSales', req);
  }

  getSalesData(req: any): any {
    return this.dataservice.getHttpData('/getSalesData', req);
  }
  checkNewSalesData(req: any): any {
    return this.dataservice.postHttpData('/checkNewSalesData', req);
  }
  getSalesColumnData(req: any): any {
    return this.dataservice.getHttpData('/getSalesColumnData', req);
  }
  getStationData(req: any): any {
    return this.dataservice.getHttpData('/getStation', req);
  }
  getPriceLevelData(req: any): any {
    return this.dataservice.getHttpData('/getPriceLevel', req);
  }
  getSalesTypeData(req: any): any {
    return this.dataservice.getHttpData('/getSalesType', req);
  }
}

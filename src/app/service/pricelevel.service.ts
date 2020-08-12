import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class PriceLevelService {

    constructor(private dataservice: DataService) { }

    getPriceLevel(req: any) {
        return this.dataservice.getHttpData('/getPriceLevel', req);
    }

    savePriceLevel(req: any) {
        return this.dataservice.postHttpData('/upsertPriceLevel', req);
    }

	deletePriceLevel(req: any) {
	  return this.dataservice.postHttpData('/upsertPriceLevel', req);
	}

    getPriceLevelType(req: any) {
      return this.dataservice.getHttpData('/getPriceLevel', req);
    }    

}
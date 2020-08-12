import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class PourSizeService {

    constructor(private dataservice: DataService) { }

    getPourSize(req: any) {
        return this.dataservice.getHttpData('/getPourSize', req);
    }

    getPourDef(req: any) {
        return this.dataservice.getHttpData('/getPourSize', req);
    }

    getClass(req: any) {
        return this.dataservice.getHttpData('/getPourSize', req);
    }

    getCat(req: any) {
        return this.dataservice.getHttpData('/getPourSize', req);
    }

    getUnit(req: any) {
        return this.dataservice.getHttpData('/getPourSize', req);
    }

    savePourSize(req: any) {
        return this.dataservice.postHttpData('/upsertPourSize', req);
    }

	deletePourSize(req: any) {
	  return this.dataservice.postHttpData('/upsertPourSize', req);
	}

    getPriceLevelType(req: any) {
      return this.dataservice.getHttpData('/getPriceLevel', req);
    }    

}
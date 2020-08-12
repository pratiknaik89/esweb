import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class BrandMasterService {

    constructor(private dataservice: DataService) { }

    getBrand(req: any) {
        return this.dataservice.getHttpData('/getBrand', req);
    }

    saveBrand(req: any) {
        return this.dataservice.postHttpData('/upsertBrand', req);
    }

	deleteBrand(req: any) {
	  return this.dataservice.postHttpData('/upsertBrand', req);
	}

}
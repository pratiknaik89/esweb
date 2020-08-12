import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class OutletMasterService {

    constructor(private dataservice: DataService) { }

    getOutlet(req: any) {
        return this.dataservice.getHttpData('/getOutlet', req);
    }

    saveOutlet(req: any) {
        return this.dataservice.postHttpData('/upsertOutlet', req);
    }

	deleteOutlet(req: any) {
	  return this.dataservice.postHttpData('/upsertOutlet', req);
	}

    getOutletMasterInfo(req: any) {
        return this.dataservice.getHttpData('/getMasterInfo', req);
    }

}
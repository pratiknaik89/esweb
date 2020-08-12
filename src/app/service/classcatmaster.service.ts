import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class ClassCatMasterService {

    constructor(private dataservice: DataService) { }

    getClassCat(req: any) {
        return this.dataservice.getHttpData('/getClassCat', req);
    }

    saveClassCat(req: any) {
        return this.dataservice.postHttpData('/upsertClassCat', req);
    }

	deleteClassCat(req: any) {
	  return this.dataservice.postHttpData('/upsertClassCat', req);
	}

}
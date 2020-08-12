import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class ChainAccountService {

    constructor(private dataservice: DataService) { }

    getChainaccount(req: any) {
        return this.dataservice.getHttpData('/getChainaccount', req);
    }

    saveChainaccount(req: any) {
        return this.dataservice.postHttpData('/upsertChainaccount', req);
    }

	deleteChainaccount(req: any) {
	  return this.dataservice.postHttpData('/upsertChainaccount', req);
	}

}
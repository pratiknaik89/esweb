import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class UserAccountService {

    constructor(private dataservice: DataService) { }

    getUseraccount(req: any) {
        return this.dataservice.getHttpData('/getUseraccount', req);
    }
    
    saveUseraccount(req: any) {
        return this.dataservice.postHttpData('/upsertUseraccount', req);
    }

	deleteUseraccount(req: any) {
	  return this.dataservice.postHttpData('/upsertUseraccount', req);
	}

}
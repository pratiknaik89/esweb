import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable()
export class FranchiseService {

    constructor(private dataservice: DataService) { }

    getFranchise(req: any) {
        return this.dataservice.getHttpData('/getFranchise', req);
    }
    saveFranchise(req: any) {
        return this.dataservice.postHttpData('/upsertFranchise', req);
    }
    deleteFranchise(req: any) {
        return this.dataservice.postHttpData('/upsertFranchise', req);
    }
    getFranchisewiseSetting(req: any) {
        return this.dataservice.getHttpData('/getFranchisewiseSetting', req);
    }

}
import { Injectable } from '@angular/core';
import { DataService } from '../service/dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(private dataservice: DataService) { }

    getCompany(req: any): any {
        return this.dataservice.getHttpData('/company', req);
    }
    
    postCompany(req:any):any{
        return this.dataservice.postHttpData('/company',req);
    }
}

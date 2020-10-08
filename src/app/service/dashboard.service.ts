import { Injectable } from '@angular/core';
import { DataService } from '../service/dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class DashyboardService {

    constructor(private dataservice: DataService) { }

    getDashboard(req: any): any {
        return this.dataservice.getHttpData('/dashboard', req);
    }
    
 
}

import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    constructor(private dataService: DataService) {

    }

    list(req:any){
        return this.dataService.getHttpData('/document/list', req);
    }

}
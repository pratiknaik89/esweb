import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    constructor(private dataService: DataService) {

    }

    list(req: any) {
        return this.dataService.getHttpData('/document/list', req);
    }

    getDocLinkByEnvId(req: any) {
        return this.dataService.getHttpData('/document/getdoclinkbyenvid', req);
    }

    getRecpLinkByEnvDocId(req: any) {
        return this.dataService.getHttpData('/document/getrecplinkbyenvdocid', req);
    }

    getEventLogBydmid(req: any) {
        return this.dataService.getHttpData('/eventlog/geteventlogbydmid', req);
    }

    getEventLogBydrid(req: any) {
        return this.dataService.getHttpData('/eventlog/geteventlogbydrid', req);
    }

}
import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private dataservice: DataService) { }

    getAllTemplate(req: any) {
        return this.dataservice.getHttpData('/template', req);
    }

    getTemplateById(req: any) {
        return this.dataservice.getHttpData('/template/:id', req);
    }

    saveTemplate(req: any) {
        return this.dataservice.postHttpData('/template', req);
    }

    getS3TempObjectUrl(req: any) {
        return this.dataservice.getHttpData('/gets3fileurl', req);
    }

}

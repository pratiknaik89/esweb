import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private dataservice: DataService) { }

    getAllTemplate(req: any) {
        return this.dataservice.getHttpData('/template', req);
        // return this.dataservice.getHttpData('/template', req).pipe(
        //     tap(result => {
        //         result.resultValue.forEach(element => {
        //             element.recipienthead = JSON.parse(element.recipienthead);
        //             element.tags = JSON.parse(element.tags);
        //         });
        //         return result;
        //     })
        // );
    }

    getTemplateById(req: any) {
        return this.dataservice.getHttpData('/template/:id', req).pipe(
            tap(result => {
                result.resultValue.forEach(element => {
                    element.recipienthead = JSON.parse(element.recipienthead);
                    element.tags = JSON.parse(element.tags);
                });
                return result;
            })
        );
    }

    saveTemplate(req: any) {
        return this.dataservice.postHttpData('/template', req);
    }

    saveRecipient(req: any) {
        return this.dataservice.postHttpData('/template/recipient', req);
    }

    getS3TempObjectUrl(req: any) {
        return this.dataservice.getHttpData('/gets3fileurl', req);
    }

}

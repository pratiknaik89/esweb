import { Injectable } from '@angular/core';
import { DataService } from './dataservice-service';

@Injectable({
    providedIn: 'root'
})
export class SenderService {

    constructor(private dataservice: DataService){
        
    }

    sendData(req: any) {
        return this.dataservice.postHttpData('/sendmail', req);
    }
}
import { Injectable } from '@angular/core';
import { DataService } from '../service/data.service'
import { EventEmitter, Output } from '@angular/core';
@Injectable()
export class DestinationService {
    private show: boolean = false;

    constructor(private dataservice: DataService) { }


    saveCountry(req: any) {

        return this.dataservice.postHttpData('/createDestination', req);


    }

    saveState(req: any) {

        return this.dataservice.postHttpData('/createDestination', req);

    }

    saveCity(req: any) {

        return this.dataservice.postHttpData('/createDestination', req);
    }

    saveArea(req: any) {
        return this.dataservice.postHttpData('/upsertArea', req);
    }

    getDestination(req: any) {
        return this.dataservice.getHttpData('/getDestination', req);
    }

    getArea(req: any) {
        return this.dataservice.getHttpData('/getArea', req);
    }

    // getInvoiceDateList(req: any){
    //     return this.dataservice.getHttpData('/getInvoiceDateList', req);
    // }

    // saveInvoice(req: any){
    //     return this.dataservice.postHttpData('/generateInvoice', req);
    // }

    getCountryStateCity(req: any) {
        return this.dataservice.getHttpData('/getCountryStateCity', req);
    }

}

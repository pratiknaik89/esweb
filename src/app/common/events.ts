import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventSenderService {

    private OutletChange = new Subject<any>();
    public sendOutlet(outletid: any, outletList: any) {
        this.OutletChange.next({ id: outletid, name: outletList });
    }

    clearMessages() {
        this.OutletChange.next();
    }

    public receiveOutletChange(): Observable<any> {
        return this.OutletChange.asObservable();
    }

}
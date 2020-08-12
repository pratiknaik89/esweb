import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseRefService {
  public inputcomp: any = {}

  public getData(refcomp) {
    return this.inputcomp[refcomp.id] || {};
  }

  public setData(refcomp, data) {
    this.inputcomp[refcomp.id] = data;
  }

  public destroy(refcomp) {
    delete this.inputcomp[refcomp.id];
  }

  public getRef() {
    return (new Date()).getTime().toString();
  }

  public getNewRefData(refcomp, refdata) {
    refcomp = refcomp || {};
    refcomp.id = this.getRef();
    this.inputcomp[refcomp.id] = refdata || {};
    return this.inputcomp[refcomp.id];
  }
}
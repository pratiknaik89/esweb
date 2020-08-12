import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccounteventService {

  constructor() { }

  private AccountChange = new Subject<any>();
  public sendAccount(accountdata: any) {
    this.AccountChange.next(accountdata);
  }

  clearMessages() {
    this.AccountChange.next();
  }

  public receiveAccountChange(): Observable<any> {
    return this.AccountChange.asObservable();
  }
}

import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { GlobalService } from "./global.service";
import { map } from "rxjs/operators";
import { observable, Observable } from "rxjs";
import { DataService } from '../service/dataservice-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataservice: DataService, private globalservice: GlobalService) { }

  getUser(req: any) {
    return this.dataservice.getHttpData('/user', req);
}
saveUser(req: any) {
    return this.dataservice.postHttpData('/user', req);
}
blockUser(req: any) {
    return this.dataservice.postHttpData('/blockUser', req);
}
createOtherSession(req: any) {
    return this.dataservice.postHttpData('/createOtherSession', req);

}
getUserprofile(req: any) {
    return this.dataservice.getHttpData('/getUser', req);

}
changePass(req: any) {
    return this.dataservice.postHttpData('/updatepassword', req);
}
changePwd(req: any) {
    return this.dataservice.postHttpData('/changepassword', req);
}

//CHINMAY CODE FOR FORGET PASSWORD
forgetPassword(req: any) {

    return this.dataservice.postHttpData('/forgetPassword', req);
}
updatePassword(req: any) {

    return this.dataservice.postHttpData('/updateforgotPassword', req);
}

otpSubmission(req: any) {

    return this.dataservice.postHttpData('/submitotp', req);
}
}



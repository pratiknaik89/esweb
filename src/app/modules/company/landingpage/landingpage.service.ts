import { Injectable } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Injectable()
export class LandingPageService {

  constructor(private dataservice: DataService) { }

  postLandingpage(req: any) {
    return this.dataservice.postHttpData('/landingpage', req);

  }

  getLandingpage(req: any) {
    return this.dataservice.getHttpData('/landingpage', req);
  }

}

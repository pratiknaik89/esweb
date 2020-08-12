import { Injectable } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Injectable()
export class BannerService {

  constructor(private dataservice: DataService) { }

  postBanner(req: any) {
    return this.dataservice.postHttpData('/banner', req);

  }

  getBanner(req: any) {
    return this.dataservice.getHttpData('/banner', req);
  }

}

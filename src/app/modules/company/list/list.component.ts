import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../service/toast-service';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  companyList: any;
  backUrl: any;
  buttons: any = [];

  constructor(private global: GlobalService, public translate: TranslateService, private actRoute: ActivatedRoute, private route: Router, private message: ToastService, private companyservice: CompanyService) { }

  ngOnInit() {
    localStorage.removeItem('masterdata');
    this.backUrl = this.actRoute.snapshot.params.backurl;
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyservice.getCompany({
      'operate': 'forpanel'
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.companyList = res.resultValue;
        // this.global.setDispORCompIdDDL(res.resultValue);
      }
      else {
        this.companyList = [];
      }
    }, (error) => {

    })
  }

  buttonClicks(event) {
    return;
  }

  onClickLink(item) {
    console.log(item);
    localStorage.removeItem('dispid');
    this.global.setCompany({
      id: item.id,
      name: item.name,
      logo: item.logo,
      companycode:item.companycode
    });
    this.global.envUpdated();
    if (this.backUrl) {
      this.route.navigate([this.backUrl]);
    } else {
      this.route.navigate(['/dashboard']);
    }

  }

}

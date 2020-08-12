import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../service/company.service';
 
import { ToastService } from '../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  buttons: ({ 'id': string; 'color': string; 'bg': string; 'text': string; 'iconi': string; 'shortcut': string; 'access': boolean; 'rtype'?: undefined; } | { 'id': string; 'color': string; 'bg': string; 'text': string; 'iconi': string; 'shortcut': string; 'access': boolean; 'rtype': string; })[];
  @ViewChild('template') popupContainer;
  modalRef: BsModalRef;
  countries: any = [];
  cmpcountry: any = '';
  cmpcode: any = '';
  cmpdomain: any = '';
  cmploginpwd: any = '';
  cmploginemail: any = '';
  cmpcontact: any = '';
  cmpemail: any = '';
  cmpname: any = '';
  cmploggernname: any = '';
  company: any = {
    cmpcode: "", cmpcountry: "", cmpname: "", cmpemail: "", cmpcontact: "", cmploggernname: "",cmploggerfname:"",cmploggerlname:"",cmpusername:"", cmploginemail: "", cmploginpwd: "", cmpdomain: [{
      id: 0,
      domain: '',
      active: true
    }]
  };
  tempcompany: any = {};
  tempcmpdomain: string;
  cmpid: any = '';
  constructor(private companyservice: CompanyService, private modalService: BsModalService, private router: Router, public route: ActivatedRoute, private message: ToastService, private translate: TranslateService) { }

  ngOnInit() {



    if (this.route.snapshot.paramMap.has('id')) {
      this.cmpid = this.route.snapshot.paramMap.get('id');
      //console.log(id);
      this.getCompanyBasicDetails(this.cmpid);
    } else {
      this.getcompanycode();
    }

    this.tempcompany = JSON.parse(JSON.stringify(this.company));
    this.buttons = [{
      'id': 'back', 'color': 'white', 'bg': 'info', 'text': 'Back',
      'iconi': 'fa fa-arrow-left', 'shortcut': 'ctrl+left', 'access': (this.route.snapshot.paramMap.has('id')) ? true : false
    },
    {
      'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset',
      'iconi': 'fa fa-rotate-left', 'shortcut': 'ctrl+r', 'access': true
    },
    {
      'id': 'draft', 'color': 'white', 'bg': 'info', 'text': 'Draft',
      'iconi': 'fa fa-file', 'shortcut': 'ctrl+d', 'access': true
    },
    {
      'id': 'save', 'color': 'white', 'bg': 'success', 'text': 'Save',
      'iconi': 'fa fa-save', 'shortcut': 'ctrl+s', 'access': true, 'rtype': 'submit'
    }
    ];

    this.checkdomainset();
  }

  buttonClicks(id) {
    switch (id) {
      case 'back':
        this.router.navigate(['/company/view']);
        break;
    }
  }

  getcompanycode() {
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'createcompanycode'
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          //console.log(data.resultValue);
          let res = JSON.parse(data.resultValue);
          this.company.cmpcode = res.cmpcode;
          this.countries = res.countries;
          //console.log(this.countries);
          // let cntry = this.countries.filter(element => {
          //   return element.countryname === 'United States';
          // });
          this.countries.filter(element => {
            if (element.name == 'United States') {
              this.company.cmpcountry = element.code;

            }
          });
        }
      },
      error => { }
    );
  }

  getCompanyBasicDetails(cmpid) {
    // 'cmpname': this.company.cmpname,
    //   'cmpcode': this.company.cmpcode,
    //     'country': this.company.cmpcountry,
    //       'cmpemail': this.company.cmpemail,
    //         'cmpcontact': this.company.cmpcontact,
    //           'cmploginemail': this.company.cmploginemail,
    //             'cmploggernname': this.company.cmploggernname,
    //               'cmploginpwd': this.company.cmploginpwd,
    //                 'cmpdomain': this.company.cmpdomain
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'getcmpbasicdetails',
      'cmpid': cmpid
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          //debugger;
          //console.log(data.resultValue);
          let res = data.resultValue;
          this.company.cmpcode = res.cmpcode;
          this.company.cmpname = res.cmpname;
          this.company.cmpcountry = res.cmpcountry;
          this.company.cmpemail = res.cmpemail;
          this.company.cmpcontact = res.cmpcontact;
          this.company.cmploginemail = res.cmploginemail;
          this.company.cmploggerfname = res.cmploggerfname;
          this.company.cmploggerlname = res.cmploggerlname;
          this.company.cmpusername = res.cmpusername;
          //this.company.cmploginpwd = res.cmploginpwd;
          
          this.company.cmpdomain = JSON.parse(res.cmpdomain);
          this.countries = res.countries;

          this.checkdomainset();
        }
      },
      error => { }
    );
  }

  saveCmpDetails() {
    let flag = true;
    let flagfield = ""
    if (this.company.cmpname == "") {
      flagfield = "Company name";
      flag = false;
    }

    if (this.company.cmpcountry == "") {
      flagfield = "Country";
      flag = false;
    }
    if (this.company.cmpemail == "") {
      flagfield = "Email";
      flag = false;
    }
    if (this.company.cmpcontact == "") {
      flagfield = "Contact";
      flag = false;
    }
    if (this.company.cmploginemail == "") {
      flagfield = "Login Email";
      flag = false;
    }

    // if (this.company.cmploggernname == "") {
    //   flagfield = "Login name";
    //   flag = false;
    // }
    if (this.company.cmploggerfname == "") {
      flagfield = "First name";
      flag = false;
    }
    if (this.company.cmploggerlname == "") {
      flagfield = "last name";
      flag = false;
    }
    if (this.company.username == "") {
      flagfield = "Username";
      flag = false;
    }
    if (this.cmpid == '') {
      if (this.company.cmploginpwd == "") {
        flagfield = "Login password";
        flag = false;
      }
    }


    if (this.company.cmpdomain.length == 0) {
      flagfield = "Domain";
      flag = false;
    }
    if (flag == false) {
      //this.message.showTranslate("Warning", flagfield + ' must not be empty', 'warn', this.translate);
      this.message.show('warn', flagfield + ' must not be empty', 'warn', this.translate);
      // this.global.showLoader(flagfield + ' empty');
      return false;
    }
    //return false;
    let type = 'add';
    if (this.cmpid == '') {
      type = 'add';
    } else {
      type = 'update';
    }
    this.companyservice.postCompany({
      'module': 'company',
      'type': type,
      'cmpid': this.cmpid,
      'data': {
        'cmpname': this.company.cmpname,
        'cmpcode': this.company.cmpcode,
        'country': this.company.cmpcountry,
        'cmpemail': this.company.cmpemail,
        'cmpcontact': this.company.cmpcontact,
        'cmploginemail': this.company.cmploginemail,
        'cmploggernname': this.company.cmploggernname,
        'cmploggerfname': this.company.cmploggerfname,
        'cmploggerlname': this.company.cmploggerlname,
        'cmpusername': this.company.cmpusername,
        'cmploginpwd': this.company.cmploginpwd,
        'cmpdomain': this.company.cmpdomain
      }
    }).subscribe(
      data => {
        console.log(data);
        //this.message.show('error', error, 'error', this.translate);
        this.message.show('done', "Saved Successfully", 'success', this.translate);

        if (this.cmpid == '') {
          this.company = this.tempcompany;
          this.getcompanycode();
        }

        this.checkdomainset();
      },
      error => {
        this.message.show('Error', "Failed", 'error', this.translate);
      }
    )
  }

  domain() {
    this.openModal(this.popupContainer);
  }

  openModal(content: string) {

    this.modalRef = this.modalService.show(content);

  }
  checkdomainset() {
    //debugger;
    console.log(this.company.cmpdomain);
    if (this.company.cmpdomain == "" || this.company.cmpdomain == null) {
      this.tempcmpdomain = "Add Domain";
    } else {
      this.tempcmpdomain = "Add Domain";
    }
  }
  closeModal() {
    this.modalRef.hide();
    this.checkdomainset();
  }

  addMoreDomain() {
    this.company.cmpdomain.push({
      id: 0,
      domain: '',
      active: true
    });
  }

  removeDomain(item, index) {
    this.company.cmpdomain.splice(index, 1);
  }

  checkDuplicateDomain(item, index) {
    let repeat = 0;
    for (let i = 0; i < this.company.cmpdomain.length; i++) {
      const element = this.company.cmpdomain[i];
      if (element.domain == item.domain) {
        repeat++;
      }
    }
    if (repeat > 1) {
      this.message.show('warn', 'Domain name cannot be Duplicate', 'warn', this.translate);
      item.domain = '';
    }
  }

  apply() {
    this.company.cmpdomain = this.company.cmpdomain.filter((a) => {
      return a.domain != '';
    });
    this.closeModal();
  }
}

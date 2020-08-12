import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../../service/company.service';
import { GlobalService } from '../../../service/global.service';
// import { getFirstTemplatePass } from '@angular/core/src/render3/state';
import { ToastService } from '../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('template') popupContainer;
  modalRef: BsModalRef;
  @ViewChild('fileUpload1') ndaUpload1: FileUpload;
  timezoneList: any = [];
  buttons: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];

  //country:any='';
  //cmpcode:any = '';
  countries: any;
  //cmpname: any;
  states: any;
  cities: any[];
  //state: any='';
  //city: any='';
  //timezone: any;
  uploadMaxFilesize: any = '';
  upload_url = '';

  company: any = {
    cmpcode: "", cmpname: "", cmpcontact: "", cmpemail: "", country: "", state: "", city: "", addr1: "", addr2: "", timezone: "", img1: "", cmpdomain: [{
      id: 0,
      domain: '',
      active: true
    }]
  };
  tempcompany: any = {};


  tempcmpdomain = "";
  src1: any;
  cloudninary_url = this.global.getConfig().cloudinary_url;
  cmpid: any = '';
  imgParentPath: string = '';
  constructor(private translate: TranslateService, private router: Router, public route: ActivatedRoute, private modalService: BsModalService, private companyservice: CompanyService, private global: GlobalService, private message: ToastService) {
    translate.use(global.getLang());
  }
  ngOnInit() {

    if (this.route.snapshot.paramMap.has('id')) {
      this.cmpid = this.route.snapshot.paramMap.get('id');
      //console.log(id);
      //this.getCompanyBasicDetails(this.cmpid);
    } else {
      //this.getcompanycode();
    }

    this.imgParentPath = this.global.getDomainEnvData().cloudinary_url + "cmp" + this.global.getCompany() + "/";

    this.getCompanyDetails();

    this.tempcompany = JSON.parse(JSON.stringify(this.company));
    this.uploadMaxFilesize = this.global.getConfig().maxfileuploadsize;
    this.upload_url = this.global.getConfig().directUpload + '?module=company';
    this.buttons = [
      {
        'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset',
        'iconi': 'fa fa-rotate-left', 'shortcut': 'ctrl+r', 'access': true
      },

      {
        'id': 'save', 'color': 'white', 'bg': 'success', 'text': 'Save',
        'iconi': 'fa fa-save', 'shortcut': 'ctrl+s', 'access': true, 'rtype': 'submit'
      }
    ];


    this.getTimezones();



  }

  buttonClicks(a) {

    switch (a) {

      case 'save':
        this.companySave();
        break;
      case 'reset':
        this.companyReset();
        break;
      default:
        break;
    }
    return a;
  }

  getCompanyDetails() {
    //alert(this.cmpid);
    //return false;
    common.load('.fixed-content', 'Loading..');
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'getcompanydetails',
      'cmpid': this.cmpid
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          //console.log(data.resultValue);
          let res = data.resultValue;
          console.log(res);
          //debugger;
          this.countries = res.countries;
          this.company.cmpcode = res.cmpcode;
          this.company.cmpname = res.cmpname;
          this.company.cmpcontact = res.cmpcontact;
          this.company.cmpemail = res.cmpemail;
          this.company.country = res.countryid;
          this.company.state = res.stateid == 0 ? '' : res.stateid;
          this.company.city = res.cityid == 0 ? '' : res.cityid;
          this.company.timezone = res.timezoneid == 0 ? '' : res.timezoneid;
          this.company.cmpdomain = JSON.parse(res.cmpdomain);
          this.company.addr1 = res.address;
          this.company.img1 = res.img1;
          //this.company.img1 = res.img1;
          if (res.img1 == "" || typeof res.img1 == 'undefined') {
            this.src1 = "";
          } else {
            this.src1 = this.imgParentPath + res.img1;
          }

          // this.countries = res.countries;

          // this.countries.filter(element => {
          //   if (element.countryname == 'United States') {
          //     this.country = element.countryid;
          //   }
          // });
          if (Number.isInteger(parseInt(res.countryid))) {
            this.getStates({ "code": res.countryid, "name": "" });
          } else {
            this.states = [];
            this.cities = [];
            this.company.state = '';
            this.company.city = '';
          }


        }
        common.hideload('.fixed-content');
        this.checkdomainset();
      },
      error => { }
    );
  }


  getStates(item: any) {
    let countryid;

    // debugger;
    if (typeof item.code != 'undefined') {
      countryid = item.code;
    } else {
      countryid = item.target.value;
    }
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'getstates',
      'countryid': countryid
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          let res = data.resultValue;
          console.log(res);
          this.states = res.states;

          console.log(this.company.state);
          if (Number.isInteger(parseInt(this.company.state))) {
            this.getCities({ "code": this.company.state, "name": "" });
          }

        }
      },
      error => {

      }
    );
  }


  getCities(item: any) {

    let stateid;
    if (typeof item.code != 'undefined') {
      stateid = item.code;
    } else {
      stateid = item.target.value;
    }
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'getcities',
      'stateid': stateid
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          let res = data.resultValue;
          console.log(res);
          this.cities = res.cities;
        }

      },
      error => {

      }
    );
  }

  getTimezones() {
    this.companyservice.getCompany({
      'module': 'company',
      'type': 'gettimezones'
    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          let res = data.resultValue;
          console.log(res);
          this.timezoneList = res.timezones;
        }

      },
      error => {

      }
    );
  }


  selectFile(event, fileUpload) {
    let file = event.files[0];
    if (file.size > fileUpload.maxFileSize) {
      this.message.showTranslate('error', 'file_len_msg', 'error', this.translate);
      return false;
    }
    fileUpload.chooseLabel = "File Selected";
  }

  onFileBeforeUpload(event, type) {
    this.upload_url += '&usercreated=' + this.global.getUser().id + '&dispensary=' + this.global.getDisp() + '&cmp=' + this.global.getCompany() + '&uploadfor=company&operate=' + type;
    event.formData.append('usercreated', this.global.getUser().id);
    event.formData.append('dispensary', this.global.getDisp());
    event.formData.append('cmp', this.global.getCompany());
    event.formData.append('uploadfor', 'company');
    event.formData.append('operate', type);
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.global.getUser().token);
  }


  onFileUploadProgress(event, fileUpload) {
    fileUpload.chooseLabel = "File Uploading";
    this.global.showLoader('File is uploading');
  }


  onFileUpload(event, fileUpload, imgsrc, imgtype) {
    var res = JSON.parse(event.xhr.response);
    if (res.resultKey === 1) {
      this.global.hideLoader();
      debugger
      fileUpload.chooseLabel = "File Uploaded";
      //imgsrc.src = this.imgParentPath + res.resultValue.filename;
      this.src1 = this.imgParentPath + res.resultValue.filename;
      switch (imgtype) {
        case 1: this.company.img1 = res.resultValue.filename;
          break;
        case 2: this.company.img2 = res.resultValue.filename;
          break;
        default: this.company.img1 = res.resultValue.filename;
      }
    }

    this.global.loadertext = "Loading";
  }

  imagePopup(imgRef) {
    this.global.openPopWindow(imgRef.src);
  }


  companySave() {
    //company: any = { cmpcode: "", cmpname: "", country: "", state: "", city: "", addr1: "", addr2: "", timezone: "", img1: "" };
    let flag = true;
    let flagfield = "";
    if (this.company.cmpdomain.length == 0) {
      flagfield = "Domain";
      flag = false;
    }
    if (this.company.timezone == "") {
      flagfield = "timezone";
      flag = false;
    }
    if (this.company.addr1.trim() == "") {
      flagfield = "Address Line 1";
      flag = false;
    }
    if (this.company.city == "") {
      flagfield = "city";
      flag = false;
    }
    if (this.company.state == "") {
      flagfield = "state";
      flag = false;
    }
    if (this.company.country == "") {
      flagfield = "country";
      flag = false;
    }
    if (this.company.cmpemail.trim() == "") {
      flagfield = "Email";
      flag = false;
    }

    if (this.company.cmpcontact.trim() == "") {
      flagfield = "Contact number";
      flag = false;
    }

    if (this.company.cmpname.trim() == "") {
      flagfield = "Company name";
      flag = false;
    }





    // if (this.company.addr2 == "") {
    //   flagfield = "Address Line 2";
    //   flag = false;
    // }

    // if (this.company.img1 == "") {
    //   flagfield = "img1";
    //   flag = false;
    // }


    if (flag == false) {
      //this.message.showTranslate("Warning", flagfield + ' must not be empty', 'warn', this.translate);
      this.message.show('warn', flagfield + ' must not be empty', 'warn', this.translate);
      // this.global.showLoader(flagfield + ' empty');
      return false;
    }

    this.companyservice.postCompany({
      'module': 'company',
      'type': 'setcompanydetails',
      'cmpid': this.cmpid,
      'companydetails': this.validateData(this.company)

    }).subscribe(
      data => {
        if (data.resultKey === 1) {
          let res = data.resultValue;
          console.log(res);
          this.message.show('done', "Updated Successfully", 'success', this.translate);
        }

      },
      error => {

      }
    );
  }

  checkdomainset() {
    if (this.company.cmpdomain == '') {
      this.tempcmpdomain = "Add / View Domain";
    } else {
      //this.tempcmpdomain = this.company.cmpdomain;
      this.tempcmpdomain = "Add / View Domain";
    }
  }

  validateData(data) {
    return data;
  }

  domain() {
    this.openModal(this.popupContainer);
  }

  openModal(content: string) {

    this.modalRef = this.modalService.show(content);

  }

  closeModal() {
    this.modalRef.hide();
    this.checkdomainset();
  }

  companyReset() {
    console.log(this.company);
    let cmpcode = this.company.cmpcode;
    this.company = this.tempcompany;
    this.company.cmpcode = cmpcode;
    this.src1 = "";
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

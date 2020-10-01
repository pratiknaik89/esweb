import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../../service/global.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { DestinationService } from '../../../../service/destination-service';
import { UserService } from '../../../../service/user.service';
import { Momservice } from '../../../../service/mom.service';
import { Dispensaryservice } from '../../../../service/dispensary.service';


@Component({
  selector: 'user-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [Dispensaryservice, DestinationService, UserService]
})
export class AddComponent implements OnInit {
  @Input('editForm') editForm;
  @Output('onClose') onClose = new EventEmitter();
  @ViewChild('template') popupContainer;

  modalRef: any;
  onSaveEvt: any;
  constructor(private global: GlobalService, private router: Router, private message: ToastService,
    private translate: TranslateService, private destinationService: DestinationService, private userservice: UserService, private momService: Momservice, private dispensaryService: Dispensaryservice) {
    translate.use('en');
  }
  form: any = {
    id: null,
    refid: '',
    name: '',
    lastname: '',
    username: '',
    email: '',
    gmail: '',
    password: '',
    blockreason: '',
    phn1: '',
    ph2: '',
    fax: '',
    mob: '',
    city: '',
    state: '',
    country: '',
    addr1: '',
    addr2: '',
    parentid: '',
    zip: '',
    dispensaryid: '',
    active: true,
    admin: '',
    cnf_pass: '',
    usertype: '',
    role: '',
    comapnyid: ''

  }
  companycode:any='';
  isEdit: boolean = false;
  enableDis: boolean = false;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  userList: any = [];
  roleList: any = [];

  selectedDispensarystring: any = '';
  resetForm: any = {};
  ngOnInit() {
 
   this.companycode = this.global.getCompanycode();
    // this.bindRole();
    this.bindUser();
    this.resetForm = JSON.stringify(this.form);
    this.bindCountries();
  }
  closeModal() {


    //  this.clear();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
  sendReturnData(data, isClosePopup) {

    if (isClosePopup) {
      this.closeModal();
    }
  }
  save() {





    this.userservice.saveUser({
      "id": this.form.id,
      "name": this.form.name,
      "lastname": this.form.lastname,
      "username": this.form.username,
      "password": this.form.password,
      "email": this.form.email,
      "country": this.form.country,
      "state": this.form.state,
      "city": this.form.city,
      "addr2": this.form.addr2,
      "addr1": this.form.addr1,
      "mob": this.form.mob,
      "zip": this.form.zip,
      //"ph2": this.form.ph2,
      "ph1": this.form.ph1,
      "isactive": this.form.active,
      "fax": this.form.fax,
      "usertype": this.form.usertype,
      "role": this.form.role,

      "comapnyid": this.global.getCompany()

    }).subscribe(
      (res: any) => {
        if (res.resultKey == 1) {
          this.message.show('Success', 'User saved successfully', 'success', this.translate);
          if (this.onSaveEvt) {
            this.onSaveEvt();
          }
          this.clear();
          this.closeModal();



        }
        else if (res.resultValue.errorcode != '') {
          this.message.show('error', res.resultValue.msg, 'error', this.translate);
        }
        else {
          this.message.show('error', res.resultValue.msg, 'error', this.translate);
        }
      }, (error) => {
        this.message.show('error', error, 'error', this.translate);
      })

  }

  buttonClicks(id) {
    switch (id) {
      case 'back':
        this.router.navigate(['/user/view']);
        break;
    }
  }


  open(action, params, _onSaveEvt?: any) {


    if (_onSaveEvt) {
      this.onSaveEvt = _onSaveEvt;
    }

    if (action == 'add') {
      this.companycode = this.global.getCompanycode();
      this.isEdit = false;
      this.enableDis = false;
      this.bindUser();

      this.form = JSON.parse(this.resetForm);
    } else {
      this.companycode = this.global.getCompanycode();
      this.form = JSON.parse(this.resetForm);
      this.getEditRecord(params.id, (res) => {



      });
    }
    this.modalRef = this.global.showPopup(this.popupContainer);
  }

  getEditRecord(id, callback) {

    this.enableDis = false;
    this.isEdit = true;


    this.userservice.getUser({
      'operate': 'edit',
      'id': id
    }).subscribe((d: any) => {
      if (d.resultKey == 1) {
        if (d.resultValue.length > 0) {
          const val = d.resultValue[0];
          this.form.id = val.id;

          if (val.country != "" && val.country != null) {
            this.onCountryChange(val.country, 1);
            this.onStateChange(val.state, 1);
          }
          this.bindCountries();

          this.bindUser();

          this.form.usertype = val.usertype,
            this.bindRole();
          this.form.name = val.name;
          this.form.lastname = val.lastname;
          this.form.email = val.email;
          this.form.username = val.username;
          this.form.password = val.password;
          this.form.cnf_pass = val.password;
          this.form.ph1 = val.phone1;
          //this.form.ph2 = val.phone2;
          this.form.fax = val.fax;
          this.form.mob = val.mobileno;
          this.form.country = val.country;
          this.form.state = val.state;
          this.form.city = val.city
          this.form.addr1 = val.addr1;
          this.form.addr2 = val.addr2
          this.form.zip = val.zip,
            this.form.active = val.isactive,
            this.form.role = val.usertype,

            this.form.role = val.role_id




        }
      }
    });
  }



  clear() {

    this.form = JSON.parse(this.resetForm);
  }


  bindCountries() {

    // Gets Country List
    this.destinationService.getCountryStateCity({
      "sysparam": {
        "schema": "sys",
        "operate": "getCountries"
      },
      "params": {
        "countryid": ""
      }
    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.countryList = res.resultValue;
      }
      else {
        this.countryList = res.resultValue;
      }
    }, (error) => {
      this.message.show('error', error, 'error', this.translate);
    })

  }

  onCountryChange(e, edit) {

    let countryid = 0;

    if (edit) {
      countryid = e;
    } else {
      countryid = e.target.value;
    }

    // Gets States List based on country selected
    this.destinationService.getCountryStateCity(
      {
        "sysparam": {
          "schema": "sys",
          "operate": "getStates"
        },
        "params": {
          "countryid": countryid
        }
      }
    ).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.stateList = res.resultValue;
      }
      else {
        this.stateList = res.resultValue;
      }
    }, (error) => {
      this.message.show('error', error, 'error', this.translate);
    })
  }

  onStateChange(e, edit) {
    let stateid = 0;

    if (edit) {
      stateid = e;
    } else {
      stateid = e.target.value;
    }

    // Gets States List based on country selected
    this.destinationService.getCountryStateCity(
      {
        "sysparam": {
          "schema": "sys",
          "operate": "getCities"
        },
        "params": {
          "stateid": stateid
        }
      }
    ).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.cityList = res.resultValue;
      }
      else {
        this.cityList = res.resultValue;
      }
    }, (error) => {
      this.message.show('error', error, 'error', this.translate);
    })
  }

  bindUser() {

    console.log(this.global.getUser().usertype)
    this.momService.getMom({
      'operate': 'usertype',
      'utype': this.global.getUser().usertype,
      'isEdit': this.isEdit
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.userList = data.resultValue;
      }
    })

  }

  bindRole() {

    this.userservice.getUser({
      'operate': 'roletype',
      usertype: this.form.usertype
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.roleList = data.resultValue;
      }
    })

  }









}

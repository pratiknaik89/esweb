import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActionBarComponent } from '../../../../shared/usercontrol/actionbar/actbar.comp';
import { EnvolopeService } from '../../../../service/envolope.service';
import { GlobalService } from '../../../../service/global.service';
import { ToastService } from '../../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { TemplateService } from '../../../../service/template.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evnolope',
  templateUrl: './evnolope.component.html',
  styleUrls: ['./evnolope.component.css']
})
export class EvnolopeComponent implements OnInit {
  @ViewChild('actionbar', { static: false }) actionbar: ActionBarComponent;
  @ViewChild('template') popupContainer;
  @ViewChild('template1') popupContainer1;

  items: any = [];
  loader: boolean = false;
  showDocpannel: boolean = false;
  uniqueRecepientheadList: any = [];
  buttons = [];
  form: any = {
    id: null,
    envname: ''
  }
  onColclickid: any = '';
  searchstring: any = '';
  modalRef: any;
  noEnvmsg: any = '';
  showLoader: boolean = false;
  srcurl: any = '';
  constructor(private envlope: EnvolopeService, private global: GlobalService, private message: ToastService, private translate: TranslateService, private template: TemplateService, private modalService: BsModalService) {


    this.items = [{
      label: 'Action',
      items: [
        {
          label: 'New', icon: 'pi pi-fw pi-plus', command: (event) => {
            this.open();
          }
        },
        {
          label: 'Edit', icon: 'pi pi-fw pi-pencil', command: (event) => {
            this.edit(0);
          }
        },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
      ]
    }, {
      label: 'Template',
      items: [
        {
          label: 'Add Templates', icon: 'pi pi-fw pi-file-o', command: (event) => {
            this.getAllTemplate();
            this.open1();
          }
        },
      ]
    }];
  }
  templateList: any = [];
  documentList: any = [];
  documentsDeatilList: any = [];
  envNo: any = '';
  selectedenvelope: any = {};
  envelopeList = [];
  filePath: any = '';
  showDocspinner: boolean = false;
  ngOnInit(): void {

    this.srcurl = "https://bucket-cmp2.s3.us-east-2.amazonaws.com/template/sdlc_1598598923.pdf";
    this.filePath = "https://bucket-cmp" + this.global.getCompany() + ".s3.us-east-2.amazonaws.com/";
    console.log(this.filePath);
    this.getAllTemplate();
    //   this.templateList = [
    //     { id: 1, name: "Template 1", src: "/assets/img/img1.png" },
    //     { id: 2, name: "Template 2", src: "/assets/img/img2.png" },
    //     { id: 3, name: "Template 3", src: "" }, { id: 4, name: "Template 4", src: "/assets/img/img1.png" },
    //     { id: 5, name: "Template 5", src: "/assets/img/img2.png" },
    //     { id: 6, name: "Template 6", src: "" }
    // ];
    this.bindEnvelope();

    // for (let index = 0; index < 100; index++) {
    //   this.envelopeList.push({ id: index, name: "Envelope " + index });

    // }




  }

  buttonClicks(id) {

    switch (id) {
      case 'edit':
        this.edit(id)

        //    this.open();
        break;
      case 'add':
        this.getAllTemplate();
        this.open1();
        break;
      default:
        break;
    }
  }

  bindEnvelope() {
    this.envelopeList = [];
    this.showLoader = true;
    this.envlope.getEnvolope({
      'operate': 'bindenv'
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        this.envelopeList = data.resultValue;
        this.showLoader = false;
      } else {
        this.showLoader = false;
      }
    })
  }

  onColumnClick(item) {

    this.buttons = [
      {
        'id': 'edit', 'color': 'white', 'bg': 'primary', 'text': 'Edit Envelope', 'icon': 'pencil', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      },
      {
        'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Add Templates In Evelope', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    this.onColclickid = item.id;

    // this.documentsDeatilList = [
    //   { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    //   { id: 3, name: "Document 3", src: "" },
    //   { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 6, name: "Document 1", src: "/assets/img/img1.png" },];
    this.bindDocuments(this.onColclickid);
    this.loader = true;




    this.actionbar.changeProp('edit', 'disabled', false);
    this.selectedenvelope = item;
  }


  makeDocgrid(gridList) {

    if (gridList.length == 0) {
      this.showDocspinner = false;
      return;
    }
    gridList.forEach(element => {
      element.src = this.filePath + element.src;
      this.documentsDeatilList.push(element);
      this.uniqueRecepientheadList = this.uniqueRecepientheadList.concat(this.global.makeJSON(element.recepienthead)
      );
      //this.uniqueRecepientheadList=this.uniqueRecepientheadList.unique();
    });

    this.uniqueRecepientheadList = this.uniqueRecepientheadList.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    this.showDocspinner = false;
    console.log(this.uniqueRecepientheadList);
    // gridList.forEach(element => {
    //   element.src = this.filePath + element.src;

    //   this.uniqueRecepientheadList.push(element);

    // });



  }
  bindDocuments(envid) {
    this.documentsDeatilList = [];
    this.envlope.getEnvolope({
      'operate': 'binddocforgrid',
      'envid': envid
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        this.showDocspinner = true;
        // this.documentList = data.resultValue;
        this.makeDocgrid(data.resultValue);
      } else {

      }
    })

  }

  open() {

    this.modalRef = this.global.showPopup(this.popupContainer);
  }

  open1() {

    this.modalRef = this.global.showPopup(this.popupContainer1, { class: 'modal-lg' });
  }

  closeModal() {


    //  this.clear();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  closeModal1() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    //  this.bindDocuments(this.onColclickid);
  }

  save() {
    this.envlope.SaveEnvolope({
      "id": this.form.id,
      "envname": this.form.envname,
      "comapnyid": this.global.getCompany(),

    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.message.show('Success', 'Saved successfully', 'success', this.translate);

        this.envelopeList.push();
        this.bindEnvelope();

        this.closeModal();



      } else if (res.resultValue.errorcode != '') {
        this.message.show('error', res.resultValue.msg, 'error', this.translate);
      }
      else {
        this.message.show('error', res.resultValue.msg, 'error', this.translate);
      }
    })
  }



  searchEnvolope() {

    this.noEnvmsg = '';
    this.envelopeList = [];
    if (this.searchstring != '' || this.searchstring == undefined || this.searchstring == null) {
      this.showLoader = true;
      this.envlope.getEnvolope({
        'operate': 'searchenv',
        "keyword": this.searchstring
      }).subscribe((data: any) => {
        if (data.resultKey === 1) {


          this.showLoader = false;
          this.envelopeList = data.resultValue;
          this.noEnvmsg = this.envelopeList.length > 0 ? '' : 'No Envolope Found!'

        } else {
          this.showLoader = false;
          this.bindEnvelope();
          this.noEnvmsg = '';
        }
      })
    } else {
      this.envelopeList = [];
      this.showLoader = true;
      this.bindEnvelope();
    }



  }


  edit(id) {


    this.envlope.getEnvolope({
      'operate': 'edit',
      'id': this.onColclickid

    }).subscribe((res: any) => {
      if (res.resultKey === 1) {

        this.form.id = res.resultValue[0].id;
        this.form.envname = res.resultValue[0].name;
        this.open();

      } else {

      }

    })


  }

  checkEmptyEnvolope() {


    if (this.searchstring == '' || this.searchstring == undefined || this.searchstring == null) {
      this.envelopeList = []
      this.noEnvmsg = '';
      this.bindEnvelope();
    }
  }


  getAllTemplate() {

    this.template.getAllTemplate({
      operate: 'get'
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.createTemplateData(data.resultValue);
        // this.templateList = data.resultValue;
      }
    });
  }


  createTemplateData(data) {

    this.templateList = data;
    console.log(this.documentsDeatilList);

    let flag = this.templateList.filter((a) => {
      let flag1 = this.documentsDeatilList.filter((b) => {
        if (a.id == b.id) {
          return a.checked = true;
        }
      })
    })
  }

  urlHandle(srcurl) {
    return this.filePath + srcurl;
  }

  addTemplate() {
    let data = this.makeTemplateDate(this.templateList);

    console.log(this.templateList);
    this.envlope.SaveEnvolope({
      "id": this.onColclickid,
      "operate": "addtemplates",
      "comapnyid": this.global.getCompany(),
      "data": data

    }).subscribe((res: any) => {
      if (res.resultKey == 1) {

        this.message.show('Success', 'Saved successfully', 'success', this.translate);

        this.bindDocuments(res.resultValue.msg);

        this.closeModal1();



      } else if (res.resultValue.errorcode != '') {
        this.message.show('error', res.resultValue.msg, 'error', this.translate);
      }
      else {
        this.message.show('error', res.resultValue.msg, 'error', this.translate);
      }
    })
  }

  makeTemplateDate(templateList) {
    let finalArray = [];
    templateList.forEach(element => {
      if (element.checked == true) {
        finalArray.push(element.id);
      }
    });
    return finalArray;
  }
}

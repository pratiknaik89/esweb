import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActionBarComponent } from '../../../../shared/usercontrol/actionbar/actbar.comp';
import { EnvolopeService } from '../../../../service/envolope.service';
import { GlobalService } from '../../../../service/global.service';
import { ToastService } from '../../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-evnolope',
  templateUrl: './evnolope.component.html',
  styleUrls: ['./evnolope.component.css']
})
export class EvnolopeComponent implements OnInit {
  @ViewChild('actionbar', { static: false }) actionbar: ActionBarComponent;
  @ViewChild('template') popupContainer;
  items: any = [];
  loader: boolean = false;
  showDocpannel: boolean = false;
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
  constructor(private envlope: EnvolopeService, private global: GlobalService, private message: ToastService, private translate: TranslateService,) {
    this.buttons = [
      {
        'id': 'edit', 'color': 'white', 'bg': 'primary', 'text': 'Edit Envelope', 'icon': 'pencil', 'shortcut': 'ctrl+shift+a',
        'disabled': true, 'access': true
      },
      {
        'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Add Templates In Evelope', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];

    this.items = [{
      label: 'Action',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-plus' },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Remove', icon: 'pi pi-fw pi-trash' }
      ]
    }, {
      label: 'Template',
      items: [
        { label: 'Add Templates', icon: 'pi pi-fw pi-file-o' }, 
      ]
    }];
  }
  documentList: any = [];
  documentsDeatilList: any = [];
  envNo: any = '';
  selectedenvelope: any = {};
  envelopeList = [];
  ngOnInit(): void {
    this.bindEnvelope();


    // for (let index = 0; index < 100; index++) {
    //   this.envelopeList.push({ id: index, name: "Envelope " + index });

    // }




  }

  buttonClicks(id) {

    switch (id) {
      case 'edit':
        this.edit(id).then((flag: boolean) => {
          if (flag) {
            this.open();
          }
        }, () => {

        });
        //    this.open();
        break;
      case 'fav':

        break;
      default:
        break;
    }
  }

  bindEnvelope() {
this.envelopeList=[];
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

    this.documentsDeatilList = [
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" },];
    this.onColclickid = item.id;
    this.loader = true;




    this.actionbar.changeProp('edit', 'disabled', false);
    this.selectedenvelope = item;
  }


  open() {


    this.modalRef = this.global.showPopup(this.popupContainer);
  }
  closeModal() {


    //  this.clear();
    if (this.modalRef) {
      this.modalRef.hide();
    }
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
    return new Promise((resolve, reject) => {
      this.envlope.getEnvolope({
        'operate': 'edit',
        'id': this.onColclickid

      }).subscribe((res: any) => {
        if (res.resultKey === 1) {

          this.form.id = res.resultValue[0].id;
          this.form.envname = res.resultValue[0].name;
          resolve(true);
        } else {
          reject();
        }

      })

    });
  }

  checkEmptyEnvolope() {
    
   
    if (this.searchstring == '' || this.searchstring == undefined || this.searchstring == null) {
      this.envelopeList=[]
      this.noEnvmsg='';
      this.bindEnvelope();
    }
  }
}

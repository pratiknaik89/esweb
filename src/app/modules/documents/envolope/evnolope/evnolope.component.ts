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
    id: '',
    envname: ''
  }
  searchstring: any = '';
  modalRef: any;
  constructor(private envlope: EnvolopeService, private global: GlobalService, private message: ToastService, private translate: TranslateService,) {
    this.buttons = [
      {
        'id': 'edit', 'color': 'white', 'bg': 'primary', 'text': 'Edit Envelope', 'icon': 'pencil', 'shortcut': 'ctrl+shift+a',
        'disabled': true, 'access': true
      },
      {
        'id': 'add', 'color': 'white', 'bg': 'success', 'text': 'Add Template In Evelope', 'icon': 'plus', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];


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


    this.documentsDeatilList = [
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" },];

  }

  buttonClicks(id) {

    switch (id) {
      case "id": {

      }
    }
  }

  bindEnvelope() {
    debugger
    this.envlope.getEnvolope({
      'operate': 'bindenv'
    }).subscribe((data: any) => {
      if (data.resultKey === 1) {
        this.envelopeList = data.resultValue;
      }
    })
  }

  onColumnClick(item) {

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
      "envname": this.form.envname,
      "comapnyid": this.global.getCompany(),

    }).subscribe((res: any) => {
      if (res.resultKey == 1) {
        this.message.show('Success', 'Envelope created successfully', 'success', this.translate);
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
     debugger
    let tempEnvlist=[];
    tempEnvlist=this.envelopeList;
    let searchInenvList=[];
    searchInenvList=this.envelopeList;
    let record = searchInenvList.filter((a) => {
      return a.name==this.searchstring;
    }
    
    )

    if(record != undefined){
      //  this.envelopeList=[];
      //  record.forEach(element => {
      //   this.envelopeList.push(element);
      //  });

    }


  }
}

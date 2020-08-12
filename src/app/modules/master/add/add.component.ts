import { Component, OnInit,Input,Output,ViewChild,EventEmitter } from '@angular/core';
import { GlobalService } from '../../../service/global.service';
import{MasterService} from '../../../service/master.service';
import { ToastService } from '../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'master-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  modalRef: any;
  onSaveEvt: any;
  @Input('editForm') editForm;
  @Output('onClose') onClose = new EventEmitter();
  @ViewChild('template') popupContainer;
  constructor(private global: GlobalService,private masterService:MasterService,private message: ToastService,private translate: TranslateService,) { }
  form: any = {
id:null,
 code:'',
 name:'',
 group:'',
 parentid:'',
 description:'',
 active:true

  }
  resetForm: any = {};
  ngOnInit(): void {
    this.resetForm = JSON.stringify(this.form);
  }
  clear() {

    this.form = JSON.parse(this.resetForm);
  }

  open(action, params, _onSaveEvt?: any) {

    if (_onSaveEvt) {
      this.onSaveEvt = _onSaveEvt;
    }

    if (action == 'add') {
     

      this.form = JSON.parse(this.resetForm);
    } else {
      this.form = JSON.parse(this.resetForm);
      this.getEditRecord(params.id, (res) => {



      });
    }
    this.modalRef = this.global.showPopup(this.popupContainer);
  }
  


  save() {
    debugger
this.masterService.postMaster({
      "id": this.form.id,
      "name": this.form.name,
      "group":this.form.group,
      "parentid":this.form.parentid,
      "description":this.form.description,
      "isactive":this.form.active,
      "code":this.form.code
     

    }).subscribe(
      (res: any) => {
        if (res.resultKey == 1) {
          this.message.show('Success', 'Record saved successfully', 'success', this.translate);
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

  closeModal() {


    //  this.clear();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }


  getEditRecord(id, callback) {

 


    this.masterService.getMaster({
      'operate': 'edit',
      'id': id
    }).subscribe((d: any) => {
      if (d.resultKey == 1) {
        if (d.resultValue.length > 0) {
          const val = d.resultValue[0];
          this.form.id = val.id;
          this.form.name=val.name,
          this.form.group=val.group
          this.form.parentid=val.parentid
          this.form.description=val.description
          this.form.active=val.active,
          this.form.code=val.code
        
        

        




        }
      }
    });
  }
}

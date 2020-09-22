import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../../service/template.service'
import { ClsTRecipientDtl, ClsRecipient, ClsRecipientType } from '../../../model/cls-recipient-model';
import { ClsTemplate } from '../../../model/cls-template.model';
import { GlobalService } from '../../../service/global.service';
import { ToastService } from '../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';
import { Editor } from 'primeng/editor';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RecControlComponent } from './control/rec-control.comp';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  tRecipient: ClsTRecipientDtl;
  tRecipientTemp: ClsTRecipientDtl;
  recipientType: Array<ClsRecipientType>;
  @ViewChild('f') ngForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router,
    private template: TemplateService, private global: GlobalService,
    private message: ToastService, private translate: TranslateService) {
    this.tRecipient = new ClsTRecipientDtl();
    this.recipientType = [new ClsRecipientType("1", "Signer"), new ClsRecipientType("2", "Receive Carbon Copy")];
  }

  buttons: any = [];

  ngOnInit(): void {
    this.buttons = [
      {
        'id': 'next', 'color': 'white', 'bg': 'success', 'text': 'Next', 'icon': 'arrow-right', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    this.tRecipient.recipienthead.push(new ClsRecipient());

    this.tRecipient.templateid = this.route.snapshot.paramMap.get('id');
    this.getTemplateById(this.route.snapshot.paramMap.get('id'));
    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     console.log(params);
    //   });

  }

  addnewTemplate() {
    this.tRecipient.recipienthead.push(new ClsRecipient());
  }

  getTemplateById(id) {
    this.template.getTemplateById({
      operate: 'get',
      id: id
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        if (data.resultValue.length) {
          this.tRecipient = data.resultValue.map(a => new ClsTRecipientDtl(a.id, a.subject, a.emailbody, a.keeporder, a.recipienthead))[0];
          this.tRecipientTemp = { ...this.tRecipient };
        }
        // this.tRecipient.emailbody = <string>data.resultValue[0]["emailbody"];
        // this.tRecipient.subject = <string>data.resultValue[0]["subject"];
        // this.tRecipient.recipienthead = Array<ClsRecipient>(...data.resultValue[0]["recipienthead"]);
        // this.tRecipient.keeporder = <boolean>data.resultValue[0]["keeporder"];
      }
    });
  }

  validation() {
    if (!Boolean(this.tRecipient.emailbody)) {
      return false;
    } else if (this.tRecipient.recipienthead.length == 0) {
      this.message.show('error', "You need to have atleast 1 recipient.", 'error', this.translate);
      return false;
    } else {
      let a = this.tRecipient.recipienthead.filter(a => a.id == "" || a.rectype == "" || a.id.length < 3).length;
      if (a != 0) {
        return false;
      }

      let b = new Set(this.tRecipient.recipienthead.map(a => a.id.trim()));
      if (b.size != this.tRecipient.recipienthead.length) {
        this.message.show('error', "Recipient id should be unique.", 'error', this.translate);
        return false;
      }
    }

    return true;
  }

  saveRecipient() {
    if (this.validation()) {
      if (this.isModelChange()) {
        this.template.saveRecipient({
          operate: 'update',
          data: this.tRecipient,
          userid: this.global.getUser().id
        }).subscribe((data: any) => {
          if (data.resultKey == 1) {
            console.log(data.resultValue);
            this.router.navigate(['/documents/templates/' + this.tRecipient.templateid + '/editor']);
          } else {
            this.message.show('error', data.resultValue.msg, 'error', this.translate);
          }
        });
      } else {
        this.router.navigate(['/documents/templates/' + this.tRecipient.templateid + '/editor']);
      }
    }
  }

  buttonClicks(id) {
    switch (id) {
      case 'next':
        this.ngForm.onSubmit(undefined);
        break;
      default:
        break;
    }
  }

  remove(index) {
    this.tRecipient.recipienthead.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(this.tRecipient.recipienthead, event.previousIndex, event.currentIndex);
    }
  }

  isModelChange() {
    return JSON.stringify(this.tRecipient) === JSON.stringify(this.tRecipientTemp);
  }

}

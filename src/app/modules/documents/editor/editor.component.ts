import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../../service/template.service';
import { Subscription } from 'rxjs';
import { ClsTemplate } from '../../../model/cls-template.model';
import { iDocsigneditorComponent } from 'esigndoccontrol';
//import { iDocsigneditorComponent } from '/Users/pratiknaik/Work/i2t/DocEditor/idoceditor/dist/esigndoccontrol';
import { GlobalService } from '../../../service/global.service';
import { ToastService } from '../../../service/toast-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  sub: Subscription;
  recipients: string[] = [];
  templateDtl: ClsTemplate;
  buttons: any = [];
  options: any = '';
  @ViewChild('docsign') editor: iDocsigneditorComponent

  constructor(private route: ActivatedRoute,
    private router: Router,
    private template: TemplateService,
    private global: GlobalService,
    private message: ToastService,
    private translate: TranslateService) {
    this.templateDtl = new ClsTemplate();
  }

  ngOnInit(): void {
    $('body').addClass('sidebar-minimized');
    this.getTemplateById(this.route.snapshot.paramMap.get('id'));
    this.buttons = [
      {
        'id': 'finish', 'color': 'white', 'bg': 'success', 'text': 'Finish', 'icon': 'check', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      },
      {
        'id': 'finishnsend', 'color': 'white', 'bg': 'warning', 'text': 'Finish & Send', 'icon': ' fa fa-send', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    // this.sub = this.route
    //   .queryParams
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     console.log(params);
    //     this.template.getS3TempObjectUrl({
    //       operate: 'get',
    //       filepath: params.filepath,
    //       filename: params.filepath.substring(params.filepath.lastIndexOf("/") + 1)
    //     }).subscribe((data: any) => {
    //       if (data.resultKey == 1) {
    //         console.log(data.resultValue);
    //         this.pdfSrc = data.resultValue;
    //       }
    //     });
    //   });

  }

  buttonClicks(id) {
    switch (id) {
      case 'finish':
        this.saveRecipient();
        break;
      case 'finishnsend':
        this.saveRecipient(true);
        break;
      default:
        break;
    }
  }
  onObjectSelected(event) {

  }
  onObjectDeselected(event) {

  }
  getTemplateById(id) {
    this.template.getTemplateById({
      operate: 'get',
      id: id
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        this.templateDtl = <ClsTemplate>data.resultValue[0];
        this.recipients = this.templateDtl.recipienthead.map(a => a["id"]);
        this.editor.setRecipients(this.recipients);
        this.getTempFileUrl(this.templateDtl.docurl, this.templateDtl.dataref);
      }
    });
  }

  getTempFileUrl(filepath: string, dataref: object) {
    this.template.getS3TempObjectUrl({
      operate: 'get',
      filepath: filepath,
      filename: filepath.substring(filepath.lastIndexOf("/") + 1)
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        console.log(data.resultValue);
        this.editor.setData(data.resultValue, dataref);
      }
    });
  }

  saveRecipient(issend = false) {
    let tempid = this.route.snapshot.paramMap.get('id');
    this.template.saveDocRef({
      operate: 'update',
      data: {
        templateid: tempid,
        dataref: this.editor.getData()
      },
      userid: this.global.getUser().id
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        // console.log(data.resultValue);
        if (issend) {
          this.router.navigate(['/se/templates/view']);
        } else {
          this.router.navigate(['/documents/sender/' + 'd/' + tempid]);
        }
      } else {
        this.message.show('error', data.resultValue.msg, 'error', this.translate);
      }
    });
  }

  ngOnDestroy(): void {
    $('body').removeClass('sidebar-minimized');

    //this.sub.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }


}

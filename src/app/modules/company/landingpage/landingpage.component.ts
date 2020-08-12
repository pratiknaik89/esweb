import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalService } from '../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { ToastService } from '../../../service/toast-service';
import { LandingPageService } from './landingpage.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  providers: [LandingPageService]
})
export class LandingPageComponent implements OnInit {
  @ViewChild('fileUpload1') ndaUpload1: FileUpload;
  @ViewChild('imgpreview1') imgpreview1;
  @ViewChild('imgtype1') imgtype1;


  landingpageList = [];
  //{ title: '', desc: '', img: '', order: 0, active: true }
  landing = [];
  uploadMaxFilesize: any;
  upload_url = this.global.getConfig().directUpload + '?module=companybanners';
  buttons: any = [];
  isEditAttr:any;
  constructor(private router: Router, public route: ActivatedRoute, private global: GlobalService, private translate: TranslateService, private message: ToastService,
    private chngref: ChangeDetectorRef, private landingpage: LandingPageService) { }

  ngOnInit() {
    this.uploadMaxFilesize = 500000;

    this.loadLandingpage();

    // this.bannerList = [{
    //   "img": "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1200px-IMG_%28business%29.svg.png",
    //   "title": "Test 1",
    //   "desc": "Desc 1",
    //   "order": 0

    // }, {
    //   "img": "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1200px-IMG_%28business%29.svg.png",
    //   "title": "Test 2",
    //   "desc": "Desc 2",
    //   "order": 0

    // }];

    this.buttons = [
      // {
      //   'id': 'reset', 'color': 'white', 'bg': 'danger', 'text': 'Reset',
      //   'iconi': 'fa fa-rotate-left', 'shortcut': 'ctrl+r', 'access': true
      // },
      // {
      //   'id': 'draft', 'color': 'white', 'bg': 'info', 'text': 'Draft',
      //   'iconi': 'fa fa-file', 'shortcut': 'ctrl+d', 'access': true
      // },
      {
        'id': 'save', 'color': 'white', 'bg': 'success', 'text': 'Save',
        'iconi': 'fa fa-save', 'shortcut': 'ctrl+s', 'access': true, 'rtype': 'submit'
      }
    ];

  }

  loadLandingpage() {
    this.landingpageList = [];
    this.landingpage.getLandingpage({
      'operate': 'grid'
    }).subscribe((d: any) => { 
      const lists = d.resultValue;

      lists.forEach(el => {
        let jdata: any = {};

        try {
          jdata = JSON.parse(el.jdata);
        } catch (error) {

        }

        this.landingpageList.push({
          "id": el.id,
          "img": jdata.img,
          "title": jdata.title,
          "desc": jdata.desc,
          "order": el.order,
          "active": el.isactive,
          "isdelete": el.isdelete

        })

      });


    }, (err) => {

    }, () => {

    });
  }

  buttonClicks(id) {
    switch (id) {
      case 'save':
        this.save();
        break;

      default:
        break;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(this.landingpageList, event.previousIndex, event.currentIndex);
    }

    console.log(this.landingpageList);
  }

  /**
   * Add new attribute
   */
  addNewAtrribute() {

    this.landingpageList.unshift(
      {
        "id": 0,
        "img": "../../../../assets/img/no-image-selected.png",
        "title": "",
        "desc": "",
        "order": 0,
        "active": true,
        "isdelete": false
      }
    ); 

  }


  save() {

    
    for (let index = 0; index < this.landingpageList.length; index++) {
      const element = this.landingpageList[index];
      element.order = index + 1;

    }
    this.landingpage.postLandingpage({
      'data': this.landingpageList,
      'userid': this.global.getUser().id
    }).subscribe((d: any) => {
      if (d.resultKey == 1) {

        this.message.show('Success', d.resultValue.result, 'success', this.translate);
        this.loadLandingpage();
      }

    }, (err) => {

    }, () => {

    });


  }

  ondelete(item,index){
    if(item.id == 0 ){
      this.landingpageList.splice(index, 1);
    }else{
      item.isdelete =  !item.isdelete;
    }
    
  }
  /** File upload */

  selectFile(event, fileUpload) {

    let file = event.files[0];

    if (file.size > fileUpload.maxFileSize) {
      this.message.showTranslate('error', 'file_len_msg', 'error', this.translate);
      return false;
    }

    fileUpload.chooseLabel = "File Selected";

  }

  /**
   * This method will add headers and formData
   *
   */

  onFileBeforeUpload(event) {
    event.formData.append('usercreated', this.global.getUser().id);
  }

  onFileUploadProgress(event, fileUpload) {
    fileUpload.chooseLabel = "File Uploading";
    this.global.showLoader('File is uploading');
  }

  onFileUpload(event, fileUpload, imgsrc, item) {
    let res: any = {};
    if (event.xhr && event.xhr.response) {
      res = JSON.parse(event.xhr.response);
    } else {
      res = event.originalEvent.body;
    }
    if (res.resultKey === 1) {
      this.global.hideLoader();
      fileUpload.chooseLabel = "File Uploaded";
      // $('#imgpreview' + imgsrc).attr('src',res.resultValue.path);
      item.img = res.resultValue.filename;

    }
    this.global.loadertext = "Loading";
  }

}

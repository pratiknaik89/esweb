import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalService } from '../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { ToastService } from '../../../service/toast-service';
import { BannerService } from './banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [BannerService]
})
export class BannerComponent implements OnInit {
  @ViewChild('fileUpload1') ndaUpload1: FileUpload;
  @ViewChild('imgpreview1') imgpreview1;
  @ViewChild('imgtype1') imgtype1;


  bannerList = [];
  //{ title: '', desc: '', img: '', order: 0, active: true }
  banner = [];
  uploadMaxFilesize: any;
  upload_url = this.global.getConfig().directUpload + '?module=companybanners';
  buttons: any = [];
  isEditAttr: any;
  imgParentPath: string = '';
  constructor(private router: Router, public route: ActivatedRoute, private global: GlobalService, private translate: TranslateService, private message: ToastService,
    private chngref: ChangeDetectorRef,
    private bannerservice: BannerService) {
    translate.use(global.getLang());
  }

  ngOnInit() {
    this.uploadMaxFilesize = 500000;

    this.loadBanners();

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
    debugger
    this.imgParentPath = this.global.getDomainEnvData().cloudinary_url + "cmp" + this.global.getCompany() + "/";
  }

  loadBanners() {
    this.bannerList = [];
    this.bannerservice.getBanner({
      'operate': 'grid'
    }).subscribe((d: any) => {
      const lists = d.resultValue;

      lists.forEach(el => {
        let jdata: any = {};

        try {
          jdata = JSON.parse(el.jdata);
        } catch (error) {

        }


        this.bannerList.push({
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
      moveItemInArray(this.bannerList, event.previousIndex, event.currentIndex);
    }

    console.log(this.bannerList);
  }

  /**
   * Add new attribute
   */
  addNewAtrribute() {

    this.bannerList.unshift(
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

    for (let index = 0; index < this.bannerList.length; index++) {
      const element = this.bannerList[index];
      element.order = index + 1;

    }
    this.bannerservice.postBanner({
      'data': this.bannerList,
      'userid': this.global.getUser().id
    }).subscribe((d: any) => {
      if (d.resultKey == 1) {

        this.message.show('Success', d.resultValue.result, 'success', this.translate);
        this.loadBanners();
      }

    }, (err) => {

    }, () => {

    });


  }

  ondelete(item, index) {
    if (item.id == 0) {
      this.bannerList.splice(index, 1);
    } else {
      item.isdelete = !item.isdelete;
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

  onFileBeforeUpload(event, type) {

    this.upload_url += '&usercreated=' + this.global.getUser().id + '&dispensary=' + this.global.getDisp() + '&cmp=' + this.global.getCompany() + '&uploadfor=company&operate=' + type

    event.formData.append('usercreated', this.global.getUser().id);
    event.formData.append('dispensary', this.global.getDisp());
    event.formData.append('cmp', this.global.getCompany());
    event.formData.append('uploadfor', 'company');
    event.formData.append('operate', type);
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + this.global.getUser().token);
  }

  onFileUploadProgress(event, fileUpload) {
    fileUpload.chooseLabel = "File Uploading";
    this.global.changeLoaderText('File is uploading');
    this.global.showLoader();
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
      $('#imgpreview' + imgsrc).attr('src', this.imgParentPath + res.resultValue.filename);
      item.img = res.resultValue.filename;

    }
    this.global.loadertext = "Loading";
  }

}

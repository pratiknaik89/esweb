import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../service/global.service';
import { TemplateService } from '../../../../service/template.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  documentsDeatilList: any = [];
  sortOptions: SelectItem[];
  searchstring: any = '';
  sortKey: string;

  sortField: string;

  sortOrder: number;
  filePath: any = '';
  constructor(private template: TemplateService, private global: GlobalService,private router: Router,) { }

  ngOnInit(): void {

    this.filePath = "https://bucket-cmp" + this.global.getCompany() + ".s3.us-east-2.amazonaws.com/";
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' },
      { label: 'Brand', value: 'brand' }
    ];

    this.bindTemplateGrid();

    // this.documentsDeatilList = [
    //   { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    //   { id: 3, name: "Document 3", src: "" },
    //   { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 6, name: "Document 1", src: "/assets/img/img1.png" },  { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    //   { id: 3, name: "Document 3", src: "" },
    //   { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 6, name: "Document 1", src: "/assets/img/img1.png" },  { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    //   { id: 3, name: "Document 3", src: "" },
    //   { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 6, name: "Document 1", src: "/assets/img/img1.png" },  { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
    //   { id: 3, name: "Document 3", src: "" },
    //   { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
    //   { id: 6, name: "Document 1", src: "/assets/img/img1.png" }];
  }


  bindTemplateGrid() {
    
    this.template.getAllTemplate({
      operate: 'get'
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {

        this.makedocumentsDeatilList(data.resultValue);

        // this.templateList = data.resultValue;
      }
    });
  }

  makedocumentsDeatilList(data) {
    
    if (data.length <= 0) {
      return;
    }
    this.documentsDeatilList = [];
    data.forEach(element => {

      element.src = (element.src == null || element.src == '' || element.src == undefined) ? null :
      this.filePath + element.src;

     // element.src = this.filePath + element.src;
      this.documentsDeatilList.push(element);
    });

    console.log(this.documentsDeatilList);
  }

//   searchTemplate() {
//     
//     let tempList = this.documentsDeatilList ;
//     this.documentsDeatilList =[];
//     this.documentsDeatilList = tempList.find((a) => {
//       if(a.name.includes(this.searchstring)){
// return a;
//       }
   
//     })
//   }
  searchTemplate() {

    if (this.searchstring == '') {
      return;
    }
    this.template.getTemplate({
      "operate": 'searchtemplate',
      "keyword": this.searchstring
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {

        this.makedocumentsDeatilList(data.resultValue);

        // this.templateList = data.resultValue;
      }
    });
  }


  checkisEmpty() {
    if (this.searchstring == '' || this.searchstring == undefined || this.searchstring == null) {
      this.bindTemplateGrid();
    }

  }


  editTemplate(item){
    this.router.navigate(['/documents/templates/'+item.id +'/recipient']);

    // http://localhost:4200/#/documents/templates/7305267e-edae-11ea-8aa5-029cd58f3b70/recipient
  }
}

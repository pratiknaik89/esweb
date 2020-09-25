import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../service/global.service';
import { TemplateService } from '../../../../service/template.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers :[ConfirmationService]
})
export class ViewComponent implements OnInit {
  documentsDeatilList: any = [];
  tempdocumentsDeatilList:any=[];
  sortOptions: SelectItem[];
  searchstring: any = '';
  sortKey: string;
  config:any=[];
  sortField: string;
cmpid:any='';
  sortOrder: number;
  filePath: any = '';
  noTemplatefound: boolean=false;
  constructor(private template: TemplateService, private global: GlobalService,private router: Router,private confirmationService: ConfirmationService) { }
  buttons:any=[];
  ngOnInit(): void {
    this.config=this.global.getConfig();
this.cmpid=this.global.getCompany();
this.filePath = "https://"+this.config.AWS_BUCKET_PREFIX+"cmp"+this.global.getCompany() + ".s3.us-east-2.amazonaws.com/";
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

  buttonClicks(event){
    
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


      
      element.src =  (element.src == '' || element.src != null || element.src != undefined) ? (this.filePath + 'template/thumbnail/' + element.src.split('/')[1].replace('.pdf', '.jpeg')) : null;


     // element.src = this.filePath + element.src;
      this.documentsDeatilList.push(element);
      this.tempdocumentsDeatilList.push(element);
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

countArray:any=[];
searchTemplate(){
  debugger
  if (this.searchstring != '' || this.searchstring != undefined || this.searchstring != null) { }
  let temptemplate = this.documentsDeatilList;
 
   this.noTemplatefound= false;
 // this.templateList = [];
 for (let index = 0; index < this.documentsDeatilList.length; index++) {
   const element = this.documentsDeatilList[index];
   let name = element.name.toLowerCase();
    
   // name.includes(this.searchtemplatestring.toLowerCase());
   if(!name.includes(this.searchstring.toLowerCase())){
     element.show=false;
     this.countArray.push(1);
    
   }
   else {
    element.show=true;

    
   }
 }
 if(this.countArray.length > 1){
  this.noTemplatefound = true;
}
}
  // searchTemplate() {

  //   if (this.searchstring == '') {
  //     return;
  //   }
  //   this.template.getTemplate({
  //     "operate": 'searchtemplate',
  //     "keyword": this.searchstring
  //   }).subscribe((data: any) => {
  //     if (data.resultKey == 1) {

  //       this.makedocumentsDeatilList(data.resultValue);

  //       // this.templateList = data.resultValue;
  //     }
  //   });
  // }


  checkisEmpty() {
    if (this.searchstring == '' || this.searchstring == undefined || this.searchstring == null) {
      this.bindTemplateGrid();
    }

  }


  editTemplate(item){
    this.router.navigate(['/documents/templates/'+item.id +'/edit']);

    // http://localhost:4200/#/documents/templates/7305267e-edae-11ea-8aa5-029cd58f3b70/recipient
  }

  deleteTemplate(item){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
     
        this.template.getTemplate({
          "operate":'delete',
          "id":item.id,
          "cmpid":this.cmpid
    
        }).subscribe((data:any)=>{
          if(data.resultKey == 1){
            this.documentsDeatilList.forEach(element => {
               
              if(element.id == item.id){
                this.documentsDeatilList.splice(this.documentsDeatilList.indexOf(element),1);
              }
            });
          }
        })
      
      },
      reject: () => {
       
      }
    });
  }
  
}

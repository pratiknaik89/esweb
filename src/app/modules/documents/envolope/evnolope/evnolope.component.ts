import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-evnolope',
  templateUrl: './evnolope.component.html',
  styleUrls: ['./evnolope.component.css']
})
export class EvnolopeComponent implements OnInit {
  items:any=[];
  showDocpannel:boolean=false;
  constructor() { }
documentList:any=[];
documentsDeatilList:any=[];
envNo:any='';
  ngOnInit(): void {
    this.documentList=[{id:1,name:"Envelope 1"},{id:2,name:"Envelope 2"}]
    this.documentsDeatilList=[{id:1,name:"Document 1",src:"/assets/img/img1.png"},{id:2,name:"Document 2",src:"/assets/img/img2.png"},{id:3,name:"Document 3",src:""}];
  //   this.items = [
  //     {
  //         label: 'Documemnt 1',
  //         icon: 'pi pi-pw pi-file',
  //         command: (event) => {
  //           debugger
  //         }
         
  //     },
  //     {
  //       label: 'Documemnt 2',
  //       icon: 'pi pi-pw pi-file',
       
  //   },
  //   {
  //     label: 'Documemnt 3',
  //     icon: 'pi pi-pw pi-file',
     
  // }]
  }
  onColumnClick(index){
    this.envNo=index;
    this.showDocpannel=true;
  }
}

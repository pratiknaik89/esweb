import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  pdfSrc:any='';
  upload_url:any='';
  showreci:boolean=false;
  
array:any=[];
  constructor(private router: Router,) { }
form:any={
  id:0,
  type:'',
  name:'',
  email:'',
  active:''
  
}

  ngOnInit(): void {
    this.pdfSrc='assets/sdlc.pdf';
  }
  enableRecipient(){
    debugger
     this.router.navigate(['/documents/templates/recipient']);
   //  this.router.navigateByUrl('/documents/templates/add');

// for (let index = 0; index <3; index++) {
//   let data={
//     id:'',
//     name:'',
//     email:'',
//     rectype:''
//   }
//   this.array.push(data); 
 
// }

  }
 
}
